import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

interface Matricula {
  nome: string;
  email: string;
  curso: string;
}

const cursos = [
  { id: 1, nome: "Programação Web" },
  { id: 2, nome: "Banco de Dados" },
  { id: 3, nome: "UX Design" }
];

const matriculas: Matricula[] = [];

// Rota para listar cursos
app.get("/cursos", (req: Request, res: Response) => {
  res.status(200).json(cursos);
});

// Rota para realizar matrícula
app.post("/matricula", (req: Request, res: Response) => {
  const { nome, email, curso }: Matricula = req.body;

  // Validação dos dados
  if (!nome || !email || !curso) {
    return res.status(400).json({
      mensagem: "Dados inválidos. Nome, email e curso são obrigatórios."
    });
  }

  const novaMatricula: Matricula = {
    nome,
    email,
    curso
  };

  // Simulação de armazenamento em banco
  matriculas.push(novaMatricula);

  return res.status(201).json({
    mensagem: "Matrícula realizada com sucesso!",
    dados: novaMatricula
  });
});

// Inicialização do servidor
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

