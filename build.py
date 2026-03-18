import os

css_file = 'temp_style.css'
js_file = 'temp_script.js'
html_file = 'temp_html.html'
out_file = 'index.html'

with open(css_file, 'r', encoding='utf-8') as f:
    css_content = f.read()

with open(js_file, 'r', encoding='utf-8') as f:
    js_content = f.read()

with open(html_file, 'r', encoding='utf-8') as f:
    html_content = f.read()

html_content = html_content.replace('/* CSS_INJECT_POINT */', css_content)
html_content = html_content.replace('/* JS_INJECT_POINT */', js_content)

with open(out_file, 'w', encoding='utf-8') as f:
    f.write(html_content)

os.remove(css_file)
os.remove(js_file)
os.remove(html_file)
print("Build complete. Temporary files removed.")
