import qrcode

url = input ("Enter the URL to generate QR code: ").strip()

file_path = "C:\\Users\\biswa\\Desktop\\qrcode.png"

qr = qrcode.QRCode()
qr.add_data(url)

img = qr.make_image(fill_color="black", back_color="white")
img.save(file_path)

print(f"QR code generated and saved to {file_path}")
