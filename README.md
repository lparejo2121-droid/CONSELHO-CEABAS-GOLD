<!DOCTYPE html>
<html>
<head>
    <title>Conselho Ceabas Gold - Login</title>
    <style>
        body { font-family: Arial; background: #0a0a0a; color: gold; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
        .login-box { background: #1a1a1a; padding: 40px; border-radius: 10px; border: 2px solid gold; text-align: center; width: 300px; }
        input { display: block; width: 100%; padding: 12px; margin: 10px 0; background: #333; color: white; border: 1px solid gold; box-sizing: border-box; }
        button { width: 100%; padding: 12px; background: gold; color: black; border: none; font-weight: bold; cursor: pointer; font-size: 16px; }
        button:hover { background: #FFD700; }
        .erro { color: red; margin-bottom: 10px; }
        h2 { margin-top: 0; }
    </style>
</head>
<body>
    <div class="login-box">
        <h2>CONSELHO CEABAS GOLD</h2>
        {% if erro %}<p class="erro">{{ erro }}</p>{% endif %}
        <form method="POST">
            <input type="text" name="usuario" placeholder="Usuário" required>
            <input type="password" name="senha" placeholder="Senha" required>
            <button type="submit">ENTRAR</button>
        </form>
        <p style="font-size: 12px; margin-top: 20px;">admin / 123456<br>diretor / gold2026</p>
    </div>
</body>
</html>
