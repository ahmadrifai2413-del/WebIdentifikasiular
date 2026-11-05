import io
from PIL import Image, ImageOps, UnidentifiedImageError
from fastapi import HTTPException
from app.core.config import MAX_UPLOAD
Image.MAX_IMAGE_PIXELS = 20_000_000

def decode_image(data: bytes, mime: str):
    if len(data) > MAX_UPLOAD:
        raise HTTPException(413, 'Foto maksimal 8 MB.')
    if mime not in {'image/jpeg', 'image/png', 'image/webp'}:
        raise HTTPException(415, 'Gunakan foto JPG, PNG, atau WEBP.')
    try:
        with Image.open(io.BytesIO(data)) as source:
            if source.format not in {'JPEG', 'PNG', 'WEBP'}:
                raise HTTPException(415, 'Format isi file tidak didukung.')
            if source.width * source.height > Image.MAX_IMAGE_PIXELS:
                raise HTTPException(413, 'Resolusi foto maksimal 20 megapiksel.')
            source.load()
            return ImageOps.exif_transpose(source).convert('RGB')
    except (UnidentifiedImageError, OSError, Image.DecompressionBombError, ValueError):
        raise HTTPException(400, 'File gambar rusak atau tidak valid.')
