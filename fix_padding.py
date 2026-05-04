import os
import glob

files = glob.glob('src/components/sections/*.tsx')
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    new_content = content.replace('className="py-24 ', 'className="py-16 md:py-20 ')
    
    if new_content != content:
        with open(f, 'w', encoding='utf-8') as file:
            file.write(new_content)
        print('Updated ' + f)
