import re
import zlib
import base64
from pathlib import Path


def extract_pdf_text(pdf_path: str) -> str:
    path = Path(pdf_path)
    data = path.read_bytes()

    # Find first stream/endstream block
    match = re.search(br"stream\s*(.*?)\s*endstream", data, re.S)
    if not match:
        return ""

    stream = match.group(1).strip()

    # Decode ASCII85 then inflate (per Filter [/ASCII85Decode /FlateDecode])
    decoded = base64.a85decode(stream, adobe=True)
    inflated = zlib.decompress(decoded)
    try:
        return inflated.decode("utf-8")
    except UnicodeDecodeError:
        return inflated.decode("latin-1", errors="ignore")


if __name__ == "__main__":
    text = extract_pdf_text("Personal_Finance_Tracker_Wireframe_Assignment_v2.pdf")
    print(text)

