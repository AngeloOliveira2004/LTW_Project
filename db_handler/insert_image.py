import sqlite3
import base64
import sys

def insert_image(item_id, image_data):
    try:
        # Connect to the SQLite database
        conn = sqlite3.connect('your_database.db')
        cursor = conn.cursor()

        # Decode base64 image data
        image_blob = base64.b64decode(image_data)

        # Update the record in the database
        cursor.execute("UPDATE Items SET Image = ? WHERE Id = ?", (sqlite3.Binary(image_blob), item_id))
        conn.commit()

        print("Image inserted successfully.")

    except sqlite3.Error as e:
        print("Error:", e)

    finally:
        # Close the database connection
        if conn:
            conn.close()

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python insert_item.py <item_id> <base64_image_data>")
        sys.exit(1)

    item_id = sys.argv[1]
    image_data = sys.argv[2]

    insert_image(item_id, image_data)
