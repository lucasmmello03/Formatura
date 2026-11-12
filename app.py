from flask import Flask, render_template

from config import EVENTO


def create_app() -> Flask:
    app = Flask(__name__)

    @app.context_processor
    def inject_evento():
        return {"evento": EVENTO}

    @app.get("/")
    def index():
        return render_template("index.html")

    # Futuro: registrar aqui um Blueprint de convidados (RSVP, painel admin etc.)
    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
