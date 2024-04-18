import sqlite3
from PIL import Image
import io
import sys

def insert_image(item_id, image_path):
    try:
        # Connect to the SQLite database
        print("Connecting to the database...")
        conn = sqlite3.connect('../database.db')
        print("Connected to the database.")
        cursor = conn.cursor()

        # Open the image file using PIL
        with Image.open(image_path) as img:
            # Convert the image to bytes
            img_bytes = io.BytesIO()
            img.save(img_bytes, format=img.format)
            img_bytes = img_bytes.getvalue()

        # Update the record in the database
        cursor.execute("UPDATE Items SET photo_img_col = ? WHERE Id = ?", (sqlite3.Binary(img_bytes), item_id))
        conn.commit()

        print("Image inserted successfully.")

    except sqlite3.Error as e:
        print("Error:", e)
        print("Failed to insert image.")
    finally:
        # Close the database connection
        if conn:
            conn.close()

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python insert_item.py <item_id> <image_path>")
        sys.exit(1)

    item_id = sys.argv[1]
    image_path = sys.argv[2]

    insert_image(item_id, image_path)
