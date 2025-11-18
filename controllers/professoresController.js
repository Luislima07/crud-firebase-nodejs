// Importa a instância do Realtime Database já inicializada (config/firebase.js)
import { table } from "console";
import { db } from "../config/firebase.js";

// Importa funções do Web SDK do Realtime Database usadas no CRUD
import { ref, get, push, set, child, update, remove } from "firebase/database";

// Cria uma referência "raiz" para o nó/coleção "professores" no banco
const rootRef = ref(db, "professores");

// Exporta o controller como módulo ES (usado nas rotas)
export default {
  // [READ] Lista todas as professores
  async list(req, res) {
    try {
      const listar_tabela = await get(rootRef); //pegando informações da tabela professores
      const professores = listar_tabela.exists() ? listar_tabela.val() : {};
      res.render("professores/list", {
        title: "Lista de professores",
        professores,
      });
    } catch (e) {
      console.log(`Erro ao listar os items do Banco de Dados ${e}`);
      res.status(500).send("Erro no listar");
    }
  },
  // [CREATE - FORM] Mostra o formulário de criação (sem acessar o DB)
  createForm(req, res) {
    // Apenas renderiza a página de criação
    res.render("professores/create", { title: "Nova Categoria" });
  },

  // [CREATE - ACTION] Cria uma categoria nova
  async create(req, res) {
    try {
      const { nome, descricao } = req.body;
      const novo_registro = push(rootRef);
      await set(novo_registro, { nome, descricao });
      res.redirect("/professores");
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
      if (!snap.exists()) return res.status(404).send("Professor não encontrado");
      // Renderiza o form de edição com os dados atuais
      res.render("professores/edit", {
        title: "Editar Professor",
        id,
        professores: snap.val(),
      });
    } catch (e) {
      console.error("Erro editForm Professor:", e);
      res.status(500).send("Erro ao abrir edição");
    }
  },
  // [UPDATE - ACTION] Salva a edição de uma categoria
  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome } = req.body;
      const { descricao } = req.body;
      await update(child(rootRef, id), { nome, descricao });
      res.redirect("/professores");
    } catch (error) {
      console.error("Erro ao atualizar professor:", error);
      res.status(500).send("Erro ao atualizar professor");
    }
  },
  // [DELETE] Remove uma categoria pelo id
  async delete(req, res) {
    try {
      const { id } = req.params.id;
      await remove(child(rootRef, id));
      res.redirect("/professores");
    } catch (e) {
      console.error("Erro ao deletar professor: ", e);
      res.status(500).send("Erro ao excluir professor");
    }
  },
};
