from flask import Flask, render_template


app = Flask(__name__)
@app.route('/')
def index():
    return render_template('index.html')


@app.route('/actividades')
def actividades():
    return render_template('actividades.html')

@app.route('/estadisticas')
def estadisticas():
    return render_template('estadisticas.html')






if __name__ == '__main__':
    app.run(debug=True)

