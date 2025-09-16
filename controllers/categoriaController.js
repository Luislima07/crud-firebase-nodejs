// Importa a instância do Realtime Database já inicializada (config/firebase.js)
import { db } from "../config/firebase.js";

// Importa funções do Web SDK do Realtime Database usadas no CRUD
import { ref, get, push, set, child, update, remove } from "firebase/database";

// Cria uma referência "raiz" para o nó/coleção "categorias" no banco
const rootRef = ref(db, "categorias");

// Exporta o controller como módulo ES (usado nas rotas)
export default {
  // [READ] Lista todas as categorias
  async list(req, res) {
    res.render("categorias/list", {
      title: "Lista de Categorias",
    });
  },

  // [CREATE - FORM] Mostra o formulário de criação (sem acessar o DB)
  createForm(req, res) {
    // Apenas renderiza a página de criação
    res.render("categorias/create", { title: "Nova Categoria" });
  },

  // [CREATE - ACTION] Cria uma categoria nova
  async create(req, res) {
    try {
      const { nome, descricao } = req.body;
      const novo_registro = push(rootRef); 
      await set(novo_registro, { nome, descricao });
      res.redirect("/categorias");  
    }catch (error) {
      console.error("Erro ao criar categoria:", error);
      res.status(500).send("Erro ao criar categoria");
    }


  },

  // [UPDATE - FORM] Carrega dados para edição de uma categoria específica
  
  // [UPDATE - ACTION] Salva a edição de uma categoria
  
  // [DELETE] Remove uma categoria pelo id
  async remove(req, res) {
    const id = req.params.id; 
    
  }
};
