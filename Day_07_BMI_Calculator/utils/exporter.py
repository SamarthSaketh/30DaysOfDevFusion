from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from utils.storage import read_history

def export_history_to_pdf(filename="BMI_History_Report.pdf"):
    history = read_history()
    if not history:
        return False  # No data to export

    c = canvas.Canvas(filename, pagesize=A4)
    width, height = A4
    y = height - 50

    # Title
    c.setFont("Helvetica-Bold", 18)
    c.setFillColor(colors.darkblue)
    c.drawString(50, y, "BMI History Report")
    y -= 30

    for entry in reversed(history):
        # Entry header
        c.setFont("Helvetica-Bold", 12)
        c.setFillColor(colors.black)
        c.drawString(50, y, f"Date & Time: {entry['date_time']}")
        y -= 18

        # Entry details
        c.setFont("Helvetica", 11)
        c.setFillColor(colors.darkgreen)
        c.drawString(60, y, f"Height: {entry['height']}")
        y -= 15

        c.drawString(60, y, f"Weight: {entry['weight']}")
        y -= 15

        c.setFillColor(colors.purple)
        c.drawString(60, y, f"BMI: {entry['bmi']}  |  Category: {entry['category']}")
        y -= 15

        c.setFillColor(colors.brown)
        c.drawString(60, y, "Health Tips:")
        y -= 15

        c.setFont("Helvetica-Oblique", 10)
        c.setFillColor(colors.black)
        for line in entry["tips"].split("\n"):
            c.drawString(70, y, f"- {line}")
            y -= 13

        # Separator
        y -= 5
        c.setStrokeColor(colors.grey)
        c.line(50, y, width - 50, y)
        y -= 20

        # Page break
        if y < 100:
            c.showPage()
            y = height - 50

    c.save()
    return True
