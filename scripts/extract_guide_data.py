import zipfile
import xml.etree.ElementTree as ET
import json
import os
import re
import sys
import urllib.request

# Default paths
script_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.abspath(os.path.join(script_dir, '..'))

xlsx_path = sys.argv[1] if len(sys.argv) > 1 else os.path.abspath(os.path.join(project_root, '..', 'The Ultimate Renekton Guide Spreadsheet.xlsx'))
out_media_dir = os.path.join(project_root, 'public', 'extracted_media')
out_json_path = os.path.join(project_root, 'src', 'data', 'guideData.json')

if not os.path.exists(xlsx_path):
    print(f"Error: Excel file not found at: {xlsx_path}")
    print("Usage: python extract_guide_data.py <path_to_excel_file.xlsx>")
    sys.exit(1)

os.makedirs(out_media_dir, exist_ok=True)
os.makedirs(os.path.dirname(out_json_path), exist_ok=True)

print(f"1. Extracting media files from: {xlsx_path}")
with zipfile.ZipFile(xlsx_path, 'r') as z:
    for name in z.namelist():
        if name.startswith('xl/media/'):
            filename = os.path.basename(name)
            target = os.path.join(out_media_dir, filename)
            with open(target, 'wb') as f:
                f.write(z.read(name))

print("2. Fetching Riot Data Dragon champion mappings...")
ddragon_version = "16.20.1"
try:
    req = urllib.request.urlopen('https://ddragon.leagueoflegends.com/api/versions.json', timeout=5)
    versions = json.loads(req.read().decode('utf-8'))
    ddragon_version = versions[0]
except Exception as e:
    print(f"Using default DDragon version ({ddragon_version}): {e}")

riot_champ_map = {}
try:
    req = urllib.request.urlopen(f'https://ddragon.leagueoflegends.com/cdn/{ddragon_version}/data/en_US/champion.json', timeout=5)
    cdata = json.loads(req.read().decode('utf-8'))['data']
    for k, v in cdata.items():
        clean_name = re.sub(r'[^a-zA-Z0-9]', '', v['name'].lower())
        clean_id = re.sub(r'[^a-zA-Z0-9]', '', k.lower())
        riot_champ_map[clean_name] = k
        riot_champ_map[clean_id] = k
except Exception as e:
    print(f"Error fetching DDragon: {e}")

special_overrides = {
    'wukong': 'MonkeyKing',
    'monkeyking': 'MonkeyKing',
    'nunu': 'Nunu',
    'nunuwillump': 'Nunu',
    'renataglasc': 'Renata',
    'renata': 'Renata',
    'drmundo': 'DrMundo',
    'jarvaniv': 'JarvanIV',
    'masteryi': 'MasterYi',
    'tahmkench': 'TahmKench',
    'twistedfate': 'TwistedFate',
    'xinzhao': 'XinZhao',
    'aurelionsol': 'AurelionSol',
    'belveth': 'Belveth',
    'ksante': 'KSante',
    'chogath': 'Chogath',
    'kaisa': 'Kaisa',
    'khazix': 'Khazix',
    'kogmaw': 'KogMaw',
    'leblanc': 'Leblanc',
    'reksai': 'RekSai',
    'velkoz': 'Velkoz',
    'ambessa': 'Ambessa'
}
riot_champ_map.update(special_overrides)

print("3. Parsing Excel sheets...")
with zipfile.ZipFile(xlsx_path, 'r') as z:
    sst_xml = z.read('xl/sharedStrings.xml')
    sst = ET.fromstring(sst_xml)
    ns = {'ns': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
    strings = [''.join([t.text for t in si.findall('.//ns:t', ns) if t.text]) for si in sst.findall('ns:si', ns)]

    def get_sheet_cells(sheet_index):
        sheet_xml = z.read(f'xl/worksheets/sheet{sheet_index}.xml')
        s_tree = ET.fromstring(sheet_xml)
        data = {}
        for r in s_tree.findall('.//ns:row', ns):
            row_id = int(r.attrib.get('r'))
            data[row_id] = {}
            for c in r.findall('ns:c', ns):
                cell_ref = c.attrib.get('r')
                col_letter = re.match(r'([A-Z]+)', cell_ref).group(1)
                cell_type = c.attrib.get('t')
                val_elem = c.find('ns:v', ns)
                val = val_elem.text if val_elem is not None else ''
                if cell_type == 's' and val.isdigit():
                    val = strings[int(val)]
                data[row_id][col_letter] = val.strip()
        return data

    # Sheet 1: Introduction
    s1 = get_sheet_cells(1)
    intro_data = {
        "title": s1.get(2, {}).get('A', "Godrekton's Ultimate Renekton Guide"),
        "about": s1.get(6, {}).get('A', ""),
        "video": "https://youtu.be/iHUZWZFHpCo",
        "howToUse": s1.get(12, {}).get('A', ""),
        "socials": [
            {"platform": "YouTube", "url": "https://www.youtube.com/@Godrekton"},
            {"platform": "Twitch", "url": "https://www.twitch.tv/godrekton"},
            {"platform": "TikTok", "url": "https://www.tiktok.com/@godrekton"},
            {"platform": "Discord", "url": "https://discord.gg/renekton"}
        ]
    }

    # Sheet 2: FAQ
    s2 = get_sheet_cells(2)
    faq_raw = s2.get(6, {}).get('A', "")
    faqs = []
    faq_blocks = re.split(r'\n(?=[A-Z][a-zA-Z0-9\s\?]+\?)', faq_raw)
    for block in faq_blocks:
        parts = block.strip().split('\n', 1)
        if len(parts) == 2:
            faqs.append({"question": parts[0].strip(), "answer": parts[1].strip()})
        elif block.strip():
            faqs.append({"question": "Geral", "answer": block.strip()})

    # Sheet 3: Skin Tier List
    s3 = get_sheet_cells(3)
    skin_data = {
        "title": s3.get(2, {}).get('A', "Skin Tier List"),
        "notes": s3.get(4, {}).get('A', ""),
        "image": "/extracted_media/image13.png"
    }

    # Sheet 4: Runes
    s4 = get_sheet_cells(4)
    runes_data = {
        "title": s4.get(2, {}).get('A', "Renekton Runes"),
        "intro": s4.get(4, {}).get('A', ""),
        "video1": "https://www.youtube.com/watch?v=VWbLtKGjVc4",
        "ptaVsConqTitle": s4.get(8, {}).get('A', "PTA OR CONQ?"),
        "ptaVsConqIntro": s4.get(10, {}).get('A', ""),
        "video2": "https://www.youtube.com/watch?v=DX8tm80N-F0",
        "ptaVsConqDetails": s4.get(14, {}).get('A', ""),
        "minorRunes": s4.get(18, {}).get('A', s4.get(16, {}).get('A', "")),
        "setupsIntro": s4.get(22, {}).get('A', ""),
        "setups": [
            {
                "title": "Standard PTA (Most Consistent)",
                "description": s4.get(24, {}).get('A', ""),
                "image": "/extracted_media/image14.png"
            },
            {
                "title": "Conqueror (Extended Trades)",
                "description": s4.get(26, {}).get('A', ""),
                "image": "/extracted_media/image10.png"
            },
            {
                "title": "Electrocute / Burst Snowball",
                "description": s4.get(28, {}).get('A', ""),
                "image": "/extracted_media/image18.png"
            },
            {
                "title": "PTA + Inspiration Utility",
                "description": s4.get(30, {}).get('A', ""),
                "image": "/extracted_media/image16.png"
            },
            {
                "title": "Grasp of the Undying / Resolve Sustain",
                "description": s4.get(32, {}).get('A', ""),
                "image": "/extracted_media/image9.png"
            },
            {
                "title": "Experimental Setup",
                "description": s4.get(34, {}).get('A', ""),
                "image": "/extracted_media/image4.png"
            }
        ]
    }

    # Sheet 5: Mechanics + Combos
    s5 = get_sheet_cells(5)
    mechanics_data = {
        "title": s5.get(2, {}).get('A', "Mechanics and Combos"),
        "intro": s5.get(4, {}).get('A', ""),
        "video": "https://youtu.be/Qj2psIrQLQs",
        "sections": [
            {
                "title": "Auto Attack Cancels",
                "content": s5.get(13, {}).get('A', ""),
                "image": "/extracted_media/image25.png"
            },
            {
                "title": "Item Active Interactions / Doublecasts / Cancels",
                "items": [
                    {"name": "Ravenous Hydra", "text": s5.get(18, {}).get('A', ""), "image": "/extracted_media/image34.png"},
                    {"name": "Stridebreaker", "text": s5.get(22, {}).get('A', ""), "image": "/extracted_media/image43.png"},
                    {"name": "Profane Hydra", "text": s5.get(26, {}).get('A', ""), "image": "/extracted_media/image40.png"}
                ]
            },
            {
                "title": "Q - Cull Of The Meek Mechanics",
                "buffering": s5.get(31, {}).get('A', ""),
                "bufferingImage": "/extracted_media/image21.png",
                "flash": s5.get(35, {}).get('A', ""),
                "flashImage": "/extracted_media/image26.png",
                "animationCancels": s5.get(39, {}).get('A', ""),
                "cancelsImage": "/extracted_media/image30.png"
            },
            {
                "title": "W - Ruthless Predator Mechanics",
                "runeInteractions": s5.get(44, {}).get('A', ""),
                "runeImage": "/extracted_media/image23.png",
                "onHitBuffering": s5.get(48, {}).get('A', ""),
                "onHitImage": "/extracted_media/image33.png",
                "doubleCasts": s5.get(52, {}).get('A', ""),
                "doubleCastImage": "/extracted_media/image24.png"
            },
            {
                "title": "E - Slice And Dice Mechanics",
                "flash": s5.get(57, {}).get('A', ""),
                "flashImage": "/extracted_media/image36.png",
                "delayRemoval": s5.get(61, {}).get('A', ""),
                "delayImage": "/extracted_media/image28.png"
            },
            {
                "title": "R - Dominus Mechanics",
                "rangeInteractions": s5.get(66, {}).get('A', ""),
                "rangeImage": "/extracted_media/image32.png",
                "animationCancels": s5.get(70, {}).get('A', ""),
                "cancelsImage": "/extracted_media/image35.png"
            },
            {
                "title": "Lane / Short Trading Combos",
                "intro": s5.get(74, {}).get('A', ""),
                "content": "E > Q > AA > W > AA > E Out / E > Q > W > E. Esses combos permitem causar dano rápido preservando a vida e diminuindo a barra do oponente.",
                "image": "/extracted_media/image42.png"
            },
            {
                "title": "All-In Combos",
                "content": "Combos de all-in com R ativo e gerenciamento de fúria máxima para abater o alvo na rota ou em mergulhos sob a torre (tower dives).",
                "image": "/extracted_media/image37.png"
            }
        ]
    }

    # Sheet 6: Summoners
    s6 = get_sheet_cells(6)
    summoners_data = {
        "title": s6.get(2, {}).get('A', "Renekton's Summoner Choices"),
        "intro": s6.get(4, {}).get('A', ""),
        "spells": [
            {"name": "Ignite", "description": s6.get(8, {}).get('A', "")},
            {"name": "Teleport", "description": s6.get(12, {}).get('A', "")},
            {"name": "Flash", "description": s6.get(16, {}).get('A', "")},
            {"name": "Ghost", "description": s6.get(20, {}).get('A', "")},
            {"name": "Exhaust", "description": s6.get(24, {}).get('A', "")}
        ],
        "summary": s6.get(25, {}).get('A', "")
    }

    # Sheet 7: Items + Builds
    s7 = get_sheet_cells(7)
    items_data = {
        "title": s7.get(2, {}).get('A', "Renekton's Items And Builds"),
        "intro": s7.get(4, {}).get('A', ""),
        "video": "https://www.youtube.com/watch?v=goGe2OUl0b8",
        "itemStarts": s7.get(10, {}).get('A', ""),
        "tierList": [
            {"tier": "S Tier", "items": s7.get(20, {}).get('A', "")},
            {"tier": "A Tier", "items": s7.get(24, {}).get('A', "")},
            {"tier": "B Tier", "items": s7.get(28, {}).get('A', "")},
            {"tier": "C Tier", "items": s7.get(32, {}).get('A', "")},
            {"tier": "D Tier", "items": s7.get(36, {}).get('A', "")}
        ],
        "boots": s7.get(40, {}).get('A', ""),
        "builds": [
            {
                "title": "Core Bruiser Build",
                "description": s7.get(48, {}).get('A', ""),
                "image": "/extracted_media/image15.png"
            },
            {
                "title": "High Damage Bruiser Build",
                "description": s7.get(52, {}).get('A', ""),
                "image": "/extracted_media/image31.png"
            },
            {
                "title": "Full Damage / Lethality Build",
                "description": s7.get(56, {}).get('A', ""),
                "image": "/extracted_media/image41.png"
            }
        ]
    }

    # Sheet 8: Ability Starts + Maxing
    s8 = get_sheet_cells(8)
    abilities_data = {
        "title": s8.get(2, {}).get('A', "Renekton's Ability Maxing"),
        "intro": s8.get(4, {}).get('A', ""),
        "level1Starts": s8.get(8, {}).get('A', ""),
        "topLaneStarts": s8.get(13, {}).get('A', ""),
        "midLaneStarts": s8.get(18, {}).get('A', ""),
        "maxOrderOverview": s8.get(22, {}).get('A', ""),
        "topLaneMaxRecommendations": s8.get(27, {}).get('A', ""),
        "midLaneMaxRecommendations": s8.get(32, {}).get('A', "")
    }

    # Sheet 9: Fury Management
    s9 = get_sheet_cells(9)
    fury_data = {
        "title": s9.get(2, {}).get('A', "Fury Management"),
        "intro": s9.get(4, {}).get('A', ""),
        "understanding": s9.get(8, {}).get('A', ""),
        "diagramImage": "/extracted_media/image22.png",
        "combosIntro": s9.get(12, {}).get('A', ""),
        "shortTrades": s9.get(16, {}).get('A', s9.get(14, {}).get('A', "")),
        "shortTradesImage": "/extracted_media/image42.png",
        "allIns": s9.get(20, {}).get('A', s9.get(18, {}).get('A', "")),
        "allInsImage": "/extracted_media/image37.png",
        "waysToMaintain": s9.get(26, {}).get('A', ""),
        "practiceMethods": s9.get(30, {}).get('A', "")
    }

    # Sheet 10: Matchups (170 champions)
    s10 = get_sheet_cells(10)
    matchups = []
    for row_id in sorted(s10.keys()):
        if row_id >= 10:
            row = s10[row_id]
            champ_name = row.get('A', '').strip()
            if not champ_name:
                continue

            diff_raw = row.get('B', '')
            diff_tier = "Medium"
            diff_score = 5

            m = re.search(r'([a-zA-Z]+)\s*-\s*(\d+)/10', diff_raw)
            if m:
                diff_tier = m.group(1).capitalize()
                diff_score = int(m.group(2))
            elif '-' in diff_raw:
                parts = diff_raw.split('-')
                diff_tier = parts[0].strip().capitalize()
                score_m = re.search(r'(\d+)', parts[1] if len(parts) > 1 else '')
                if score_m:
                    diff_score = int(score_m.group(1))

            notes_raw = row.get('H', '')
            tip_chunks = re.split(r'\n*(?=\(\d+\))', notes_raw)
            tips = []
            for t in tip_chunks:
                t_str = t.strip()
                if t_str:
                    tips.append(t_str)

            clean_c = re.sub(r'[^a-zA-Z0-9]', '', champ_name.lower())
            riot_key = riot_champ_map.get(clean_c, champ_name.replace(" ", "").replace("'", ""))

            avatar_url = f"https://ddragon.leagueoflegends.com/cdn/{ddragon_version}/img/champion/{riot_key}.png"

            matchup_entry = {
                "id": champ_name.lower().replace(" ", "-").replace("'", "").replace(".", ""),
                "champion": champ_name,
                "riotKey": riot_key,
                "avatarUrl": avatar_url,
                "difficultyRaw": diff_raw,
                "difficultyTier": diff_tier,
                "difficultyScore": diff_score,
                "runes": row.get('C', ''),
                "startingItems": row.get('D', ''),
                "summoners": row.get('E', ''),
                "abilityMax": row.get('F', ''),
                "summary": row.get('G', ''),
                "detailedNotes": notes_raw,
                "tips": tips,
                "video": row.get('I', '')
            }
            matchups.append(matchup_entry)

    full_data = {
        "metadata": {
            "title": "Godrekton's Ultimate Renekton Guide",
            "author": "Godrekton",
            "extractedAt": "2026-10-13",
            "ddragonVersion": ddragon_version,
            "totalMatchups": len(matchups)
        },
        "intro": intro_data,
        "faq": faqs,
        "skinTierList": skin_data,
        "runes": runes_data,
        "mechanics": mechanics_data,
        "summoners": summoners_data,
        "items": items_data,
        "abilities": abilities_data,
        "fury": fury_data,
        "matchups": matchups
    }

    with open(out_json_path, 'w', encoding='utf-8') as f:
        json.dump(full_data, f, ensure_ascii=False, indent=2)

print(f"Generated {out_json_path} successfully ({len(matchups)} matchups)!")
