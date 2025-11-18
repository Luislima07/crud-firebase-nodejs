// Importa a instância do Realtime Database já inicializada (config/firebase.js)
import { db } from "../config/firebase.js";

// Importa funções do Web SDK do Realtime Database usadas no CRUD
import { ref, get, push, set, child, update, remove } from "firebase/database";

// Cria uma referência "raiz" para o nó/coleção "categorias" no banco
const rootRef = ref(db, "cursos");

// Exporta o controller como módulo ES (usado nas rotas)
export default {
  // [READ] Lista todas as categorias
  async list(req, res) {
    try {
      const listar_tabela = await get(rootRef) //pegando informações da tabela cursos
      const cursos = listar_tabela.exists() ? listar_tabela.val() : {};
      res.render("cursos/list", {
        title: "Lista de Cursos",
        cursos
      });
    } catch (e) {
      console.log(`Erro ao listar os items do Banco de Dados ${e}`);
      res.status(500).send('Erro no listar');
    }
  },

  // [CREATE - FORM] Mostra o formulário de criação (sem acessar o DB)
  createForm(req, res) {
    // Apenas renderiza a página de criação
    res.render("cursos/create", { title: "Novo Curso" });
  },

  // [CREATE - ACTION] Cria uma categoria nova
  async create(req, res) {
    try {
      const { nome, descricao } = req.body;
      const novo_registro = push(rootRef);
      await set(novo_registro, { nome, descricao });
      res.redirect("/cursos");
    } catch (error) {
      console.error("Erro ao criar Curso:", error);
      res.status(500).send("Erro ao criar Curso");
    }


  },




  // [UPDATE - FORM] Carrega dados para edição de uma categoria específica
  async editForm(req, res) {
    try {
      const { id } = req.params;
      const snap = await get(child(rootRef, id));
      if (!snap.exists())
        return res.status(404).send("Curso não encontrado!");
      res.render("cursos/edit",
        {
          title: "Editar Curso",
          id,
          cursos: snap.val(),
        });
    } catch (e) {
      console.error("Erro editForm categoria:", e);
      res.status(500).send("Erro ao abrir edição");
    }
  },
  // [UPDATE - ACTION] Salva a edição de uma categoria
    async update(req, res) {
      try {
          const id = req.params.id;
          const { nome } = req.body;
          const { descricao } = req.body;
          await update(child(rootRef, id), { nome, descricao });
          res.redirect("/cursos");
        } catch (error) {
            console.error("Erro ao atualizar curso:", error);
            res.status(500).send("Erro ao atualizar curso");
        }
  },
  // [DELETE] Remove uma categoria pelo id
  async delete(req, res) {
    try {
        const { id } = req.params;
        await remove(child(rootRef, id));
        res.redirect("/cursos")
      } catch (e) {
        console.error('Erro ao deletar cursos: ', e);
        res.status(500).send('Erro ao excluir curso');
      }
  }
};
