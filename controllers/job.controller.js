const { validateIdParams, validateJobDto } = require("../utils/job.utils");

const jobs = [
  {
    id: 1,
    titulo: "Desenvolvedor Backend",
    conhecimentos: ["Node.js", "Express", "MongoDB", "APIs REST"],
    remuneracao: 5500,
    beneficios: ["Vale Refeição", "Plano de Saúde", "Auxílio Home Office"],
    status: "ativo",
  },
  {
    id: 2,
    titulo: "Desenvolvedor Frontend",
    conhecimentos: ["HTML", "CSS", "JavaScript", "React"],
    remuneracao: 5200,
    beneficios: ["Vale Transporte", "Plano Odontológico", "Gympass"],
    status: "ativo",
  },
  {
    id: 3,
    titulo: "Analista de QA",
    conhecimentos: ["Testes Manuais", "Selenium", "Automação de Testes"],
    remuneracao: 4300,
    beneficios: ["Vale Refeição", "Plano de Saúde"],
    status: "inativo",
  },
  {
    id: 4,
    titulo: "DevOps Engineer",
    conhecimentos: ["Docker", "Kubernetes", "AWS", "CI/CD"],
    remuneracao: 7000,
    beneficios: ["Plano de Saúde", "PLR", "Vale Refeição"],
    status: "ativo",
  },
  {
    id: 5,
    titulo: "Product Owner",
    conhecimentos: ["Scrum", "Kanban", "Gestão de Produto"],
    remuneracao: 8000,
    beneficios: ["Plano de Saúde", "Stock Options", "Vale Transporte"],
    status: "ativo",
  },
];

const jobController = {
  create(req, res) {
    const [job, error] = validateJobDto(req.body);
    if (error) {
      return res.status(400).render("error", {
        message: error,
      });
    }

    const newJob = {
      id: jobs.length + 1,
      ...job,
    };

    jobs.push(newJob);
    res.status(201).render("jobs", {
      jobs: [newJob],
    });
  },

  findAll(_, res) {
    res.status(200).render("jobs", { jobs });
  },

  findById(req, res) {
    const [id, error] = validateIdParams(req.params);
    if (error) {
      return res.status(400).render("error", {
        message: error,
      });
    }

    const index = jobs.findIndex((v) => v.id === id);
    if (index === -1) {
      return res.status(404).render("error", {
        message: "Vaga não encontrada",
      });
    }

    res.status(200).render("jobs", {
      jobs: [jobs[index]],
    });
  },

  delete(req, res) {
    const [id, error] = validateIdParams(req.params);
    if (error) {
      return res.status(400).render("error", {
        message: "Id inválido",
      });
    }

    const index = jobs.findIndex((v) => v.id === id);
    if (index === -1) {
      return res.status(404).render("error", {
        message: "Vaga não encontrada",
      });
    }

    const deleted = jobs.splice(index, 1);
    res.status(200).render("success", {
      message: `Vaga ${deleted[0].titulo} removida com sucesso`,
    });
  },

  update(req, res) {
    const [id, error] = validateIdParams(req.params);
    if (error)
      return res.status(400).render("error", {
        message: "Id inválido",
      });

    const index = jobs.findIndex((v) => v.id === id);
    if (index === -1)
      return res.status(404).render("error", {
        message: "Vaga não encontrada",
      });

    const [job, bodyError] = validateJobDto(req.body);
    if (bodyError) {
      return res.status(400).render("error", {
        message: bodyError,
      });
    }

    const newJob = {
      id,
      ...job,
    };

    jobs[index] = newJob;
    res.status(201).render("jobs", {
      jobs: [newJob],
    });
  },
};

module.exports = jobController;
