<template>
  <div class="container">
    <h1>Matrícula em Cursos Online</h1>

    <form @submit.prevent="enviarFormulario">
      <div>
        <label>Nome completo</label>
        <input v-model="nome" type="text" />
        <span v-if="erros.nome">{{ erros.nome }}</span>
      </div>

      <div>
        <label>E-mail</label>
        <input v-model="email" type="email" />
        <span v-if="erros.email">{{ erros.email }}</span>
      </div>

      <div>
        <label>Curso</label>
        <select v-model="curso">
          <option disabled value="">Selecione um curso</option>
          <option v-for="c in cursos" :key="c.id" :value="c.nome">
            {{ c.nome }}
          </option>
        </select>
        <span v-if="erros.curso">{{ erros.curso }}</span>
      </div>

      <button type="submit">Realizar Matrícula</button>
    </form>

    <p v-if="mensagemSucesso" class="sucesso">{{ mensagemSucesso }}</p>
    <p v-if="mensagemErro" class="erro">{{ mensagemErro }}</p>
  </div>
</template>

<script>
export default {
  name: "FormularioMatricula",
  data() {
    return {
      nome: "",
      email: "",
      curso: "",
      cursos: [],
      erros: {},
      mensagemSucesso: "",
      mensagemErro: ""
    };
  },
  mounted() {
    fetch("http://localhost:3000/cursos")
      .then(res => res.json())
      .then(data => {
        this.cursos = data;
      })
      .catch(() => {
        this.mensagemErro = "Erro ao carregar cursos.";
      });
  },
  methods: {
    validar() {
      this.erros = {};

      if (!this.nome) this.erros.nome = "Nome é obrigatório";
      if (!this.email) this.erros.email = "Email é obrigatório";
      if (!this.curso) this.erros.curso = "Selecione um curso";

      return Object.keys(this.erros).length === 0;
    },

    enviarFormulario() {
      if (!this.validar()) return;

      fetch("http://localhost:3000/matricula", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nome: this.nome,
          email: this.email,
          curso: this.curso
        })
      })
        .then(res => {
          if (!res.ok) throw new Error();
          return res.json();
        })
        .then(() => {
          this.mensagemSucesso = "Matrícula realizada com sucesso!";
          this.nome = "";
          this.email = "";
          this.curso = "";
        })
        .catch(() => {
          this.mensagemErro = "Erro ao realizar matrícula.";
        });
    }
  }
};
</script>

<style>
.container {
  max-width: 500px;
  margin: auto;
  font-family: Arial;
}

input, select {
  width: 100%;
  padding: 8px;
  margin: 5px 0;
}

button {
  margin-top: 10px;
  padding: 10px;
  cursor: pointer;
}

.erro {
  color: red;
}

.sucesso {
  color: green;
}
</style>