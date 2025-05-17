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
      return res.status(400).render("message", {
        message: error,
        type: "error",
      });
    }

    const maxId = jobs.length > 0 ? Math.max(...jobs.map((j) => j.id)) : 0;
    const newJob = {
      id: maxId + 1,
      ...job,
    };

    jobs.push(newJob);
    res.status(201).render("message", {
      message: `Nova vaga criada com id "${newJob.id}"`,
      type: "success",
    });
  },

  findAll(_, res) {
    res.status(200).render("jobs", { jobs });
  },

  findById(req, res) {
    const [id, error] = validateIdParams(req.params);
    if (error) {
      return res.status(400).render("message", {
        message: error,
        type: "error",
      });
    }

    const index = jobs.findIndex((v) => v.id === id);
    if (index === -1) {
      return res.status(404).render("message", {
        message: "Vaga não encontrada",
        type: "error",
      });
    }

    res.status(200).render("jobs", {
      jobs: [jobs[index]],
    });
  },

  findByQuery(req, res) {
    const { status, remuneracaoMin, titulo, beneficio } = req.query;
    let filteredJobs = [...jobs];

    if (status) {
      filteredJobs = filteredJobs.filter(
        (job) => job.status.toLowerCase() === status.toLowerCase()
      );
    }

    if (remuneracaoMin) {
      const minRemuneration = parseFloat(remuneracaoMin);
      if (!isNaN(minRemuneration)) {
        filteredJobs = filteredJobs.filter(
          (job) => job.remuneracao >= minRemuneration
        );
      }
    }

    if (titulo) {
      filteredJobs = filteredJobs.filter((job) =>
        job.titulo.toLowerCase().includes(titulo.toLowerCase())
      );
    }

    if (beneficio) {
      filteredJobs = filteredJobs.filter((job) =>
        job.beneficios.some((b) =>
          b.toLowerCase().includes(beneficio.toLowerCase())
        )
      );
    }

    res.status(200).render("jobs", {
      jobs: filteredJobs,
    });
  },

  delete(req, res) {
    const [id, error] = validateIdParams(req.params);
    if (error) {
      return res.status(400).render("message", {
        message: "Id inválido",
        type: "error",
      });
    }

    const index = jobs.findIndex((v) => v.id === id);
    if (index === -1) {
      return res.status(404).render("message", {
        message: "Vaga não encontrada",
        type: "error",
      });
    }

    const deleted = jobs.splice(index, 1);
    res.status(200).render("message", {
      message: `Vaga "${deleted[0].id}" removida com sucesso`,
      type: "success",
    });
  },

  update(req, res) {
    const [id, error] = validateIdParams(req.params);
    if (error)
      return res.status(400).render("message", {
        message: "Id inválido",
        type: "error",
      });

    const index = jobs.findIndex((v) => v.id === id);
    if (index === -1)
      return res.status(404).render("message", {
        message: "Vaga não encontrada",
        type: "error",
      });

    const [job, bodyError] = validateJobDto(req.body);
    if (bodyError) {
      return res.status(400).render("message", {
        message: bodyError,
        type: "error",
      });
    }

    const newJob = {
      id,
      ...job,
    };

    jobs[index] = newJob;
    res.status(201).render("message", {
      message: `Vaga "${id}" atualizada com sucesso`,
      type: "success",
    });
  },
};

module.exports = jobController;
