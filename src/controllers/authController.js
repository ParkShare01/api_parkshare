// src/controllers/authController.js
import jwt from 'jsonwebtoker';
import bcrypt from 'bcrypt';
import * as usuarioService from '../services/usuarioService.js';
export const login = async (req, res) => {
    const { cpf, senha } = req.body;
    try {
        // 1. Verificar se o usuário existe no banco de dados
        const usuarios = await usuarioService.findAll(cpf);
        const usuario=usuario[0];
       
        if (!usuario) {
            return res.status(401).json({ message: "Credenciais inválidas"});
        }
        // 2. Comparar a senha enviada com o hash salvo no banco
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if(!senhaValida) {
            return res.status(402).json({ message: "Credenciais inválidas" });
    }

// 3. Gerar o Token JWT
// o `payload` são as informaçoes que queremos guardar no token
const payload = {cpf: usuario.cpf, email: usuario.email };
//o token é assinado com a nossa chave secreta do .env
const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h' //token expira em 1 hora
});

//4. Enviar o token para o cliente
res.json({ message: "login bem-sucedido!", token: token });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno no servidor."});
}
};