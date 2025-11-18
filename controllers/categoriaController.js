// Importa a instância do Realtime Database já inicializada (config/firebase.js)
import { table } from "console";
import { db } from "../config/firebase.js";

// Importa funções do Web SDK do Realtime Database usadas no CRUD
import { ref, get, push, set, child, update, remove } from "firebase/database";
import { chdir } from "process";

// Cria uma referência "raiz" para o nó/coleção "categorias" no banco
const rootRef = ref(db, "categorias");

// Exporta o controller como módulo ES (usado nas rotas)
export default {
  // [READ] Lista todas as categorias
  async list(req, res) {
    try {
      const listar_tabela = await get(rootRef); //pegando informações da tabela categorias
      const categorias = listar_tabela.exists() ? listar_tabela.val() : {};
      res.render("categorias/list", {
        title: "Lista de Categorias",
        categorias,
      });
    } catch (e) {
      console.log(`Erro ao listar os items do Banco de Dados ${e}`);
      res.status(500).send("Erro no listar");
    }
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
    } catch (error) {
      console.error("Erro ao criar categoria:", error);
      res.status(500).send("Erro ao criar categoria");
    }
  },

  // [UPDATE - FORM] Carrega dados para edição de uma categoria específica
  async editForm(req, res) {
    try {
      // Captura o id da rota (ex.: /categorias/:id/edit)
      const { id } = req.params;
      // Monta ref para o filho: categorias/{id}
      const snap = await get(child(rootRef, id));
      // Se não existir, retorna 404
      if (!snap.exists())
        return res.status(404).send("Categoria não encontrada");
      // Renderiza o form de edição com os dados atuais
      res.render("categorias/edit", {
        title: "Editar Categoria",
        id,
        categoria: snap.val(),
      });
    } catch (e) {
      console.error("Erro editForm categoria:", e);
      res.status(500).send("Erro ao abrir edição");
    }
  },
  // [UPDATE - ACTION] Salva a edição de uma categoria
  async update(req, res) {
    try {
      // Pega o id da URL e o novo nome do body
      const { id } = req.params;
      const { nome } = req.body;
      const { descricao } = req.body;
      // Atualiza apenas os campos enviados no caminho categorias/{id}
      await update(child(rootRef, id), { nome, descricao });
      // Volta para a listagem
      res.redirect("/categorias");
    } catch (e) {
      console.error("Erro update categoria:", e);
      res.status(500).send("Erro ao atualizar categoria");
    }
  },
  // [DELETE] Remove uma categoria pelo id
  async delete(req, res) {
    try {
      const { id } = req.params;
      await remove(child(rootRef, id));
      res.redirect("/categorias")
    } catch (e) {
      console.error("Erro ao deletar categoria: ", e);
      res.status(500).send("Erro ao excluir categoria");
    }
  },
};
