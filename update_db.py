import sqlite3
import os
import sys
from pypdf import PdfReader

DB_PATH = 'poultry.db'
PDF_PATH = '/home/ubuntu/upload/poultryProduction.pdf'

def update_database():
    if not os.path.exists(PDF_PATH):
        print(f"Error: PDF not found at {PDF_PATH}")
        return

    # Extract text from PDF
    print("Extracting text from PDF...")
    reader = PdfReader(PDF_PATH)
    full_text = ""
    for page in reader.pages:
        full_text += page.extract_text() + "\n"

    # Connect to DB
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()

    # Create table for reference materials if it doesn't exist
    c.execute('''
        CREATE TABLE IF NOT EXISTS reference_materials (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            content TEXT,
            created_at TEXT DEFAULT (datetime('now'))
        )
    ''')

    # Insert the book content
    c.execute('INSERT INTO reference_materials (title, content) VALUES (?, ?)', 
              ('Poultry Production Reference Book', full_text))
    
    conn.commit()
    conn.close()
    print("Database updated with reference book content.")

if __name__ == "__main__":
    # Install pypdf if not present
    os.system('pip3 install pypdf')
    update_database()
