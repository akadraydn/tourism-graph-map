import pandas as pd

# Veri setini yükleme
file_path = '/Users/akadraydn/Desktop/dataset/data_converted.csv'
data = pd.read_csv(file_path, skiprows=3)

# Sütun adlarını düzenleme
data.columns = ['Nationality'] + [str(int(float(col))) for col in data.columns[1:]]

# Nationality sütunundaki yalnızca İngilizce isimleri tutma
data['Nationality'] = data['Nationality'].apply(lambda x: x.split('-')[-1].strip())

# Grupları belirleme
groups = [
    "Foreigner total",
    "OECD Countries (Europe)",
    "OECD Countries (other)",
    "Other european countries",
    "Other East Asian Countries",
    "Com.of ındependent states",
    "East  Asian Countries",
    "Southeast Asian Count.",
    "Other Southeast Asian Count.",
    "South Asian Countries",
    "Other Sout Asian Count.",
    "West Asian Countries",
    "African Countries",
    "Republic of South Africa",
    "Other African Count.",
    "American Countries",
    "Other American Count.",
    "Ocean Countries",
    "Haimatlos",
    "Citizens total"
]

# Grupları ve ülkeleri ayırma
group_data = data[data['Nationality'].isin(groups)]
country_data = data[~data['Nationality'].isin(groups)]

# Silinecek satırları belirleme
rows_to_delete = [
    "Kaynak : Emniyet Genel Müdürlüğü",
    "Source : General Directorate of Security"
]

country_data = country_data[~country_data['Nationality'].isin(rows_to_delete)]
group_data = group_data[~group_data['Nationality'].isin(rows_to_delete)]

# NaN değerlerini 0 ile değiştirme (isteğe bağlı)
country_data = country_data.fillna(0)
group_data = group_data.fillna(0)

# Temizlenmiş veriyi JSON formatına dönüştürme
country_data_json = country_data.to_json(orient='records')
group_data_json = group_data.to_json(orient='records')

# Temizlenmiş veriyi kaydetme
country_data_json_path = '/Users/akadraydn/Desktop/dataset/country_data.json'
group_data_json_path = '/Users/akadraydn/Desktop/dataset/group_data.json'
with open(country_data_json_path, 'w') as file:
    file.write(country_data_json)
with open(group_data_json_path, 'w') as file:
    file.write(group_data_json)

# Temizlenmiş veriyi CSV formatında kaydetme
country_data_csv_path = '/Users/akadraydn/Desktop/dataset/country_data.csv'
group_data_csv_path = '/Users/akadraydn/Desktop/dataset/group_data.csv'
country_data.to_csv(country_data_csv_path, index=False)
group_data.to_csv(group_data_csv_path, index=False)

print(f"JSON paths: {country_data_json_path}, {group_data_json_path}")
print(f"CSV paths: {country_data_csv_path}, {group_data_csv_path}")
