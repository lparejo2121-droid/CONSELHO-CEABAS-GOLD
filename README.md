# Conselho Ceabas Gold
Sistema de login para o Conselho
from flask import Flask, render_template, request, redirect, url_value_preprocessor, session, url_for 

app = Flask(**name**) 

### Chave de segurança para gerenciar as sessões de login

app.secret_key = 'chave_secreta_conselho_gold' 

### Usuário e senha de teste (em produção, use um banco de dados)

USUARIOS_PERMITIDOS = {
"admin": "gold123",
"membro": "ceabas2026"
} 

@app.route('/')
def index(): 

### Se já estiver logado, vai direto para o dashboard

if 'usuario' in session:
return redirect(url_for('dashboard')) 

### Tela de login simples caso não esteja logado

return ''' 

'''
@app.route('/login', methods=['POST'])
def login():
usuario = request.form.get('usuario')
senha = request.form.get('senha') 

### Verifica se as credenciais estão corretas

if usuario in USUARIOS_PERMITIDOS and USUARIOS_PERMITIDOS[usuario] == senha:
session['usuario'] = usuario
return redirect(url_for('dashboard')) 

return 'alert("Usuário ou senha incorretos!"); window.location.href="/
