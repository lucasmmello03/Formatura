# Convite de Formatura

Site simples em [Flask](https://flask.palletsprojects.com/) com o convite da formatura.

## Rodando localmente

```bash
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
flask --app app run --debug
```

Acesse http://127.0.0.1:5000

## Personalizar

Edite os dados em `config.py` (nome, data, local, traje, WhatsApp).
Visual em `static/css/style.css`.

## Estrutura

```
app.py              # app Flask (factory)
config.py           # dados do evento
templates/          # HTML (Jinja2)
static/css|js|img/  # estilos, contagem regressiva, imagens
```

## Próximos passos (gerenciador de convidados)

- Flask-SQLAlchemy + SQLite: tabela `Convidado` (nome, token, acompanhantes, status)
- Link individual por convidado: `/c/<token>` com RSVP
- Painel `/admin` protegido por senha com lista e exportação CSV
