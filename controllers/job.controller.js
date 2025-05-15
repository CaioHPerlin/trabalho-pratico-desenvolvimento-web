const { validateIdParams, validateCreateJobDto } = require("../utils/job.utils");

const jobs = [
    {
        id: 1,
        titulo: "Desenvolvedor Backend",
        conhecimentos: ["Node.js", "Express", "MongoDB", "APIs REST"],
        remuneracao: 5500,
        beneficios: ["Vale Refeição", "Plano de Saúde", "Auxílio Home Office"],
        status: "ativo"
    },
    {
        id: 2,
        titulo: "Desenvolvedor Frontend",
        conhecimentos: ["HTML", "CSS", "JavaScript", "React"],
        remuneracao: 5200,
        beneficios: ["Vale Transporte", "Plano Odontológico", "Gympass"],
        status: "ativo"
    },
    {
        id: 3,
        titulo: "Analista de QA",
        conhecimentos: ["Testes Manuais", "Selenium", "Automação de Testes"],
        remuneracao: 4300,
        beneficios: ["Vale Refeição", "Plano de Saúde"],
        status: "inativo"
    },
    {
        id: 4,
        titulo: "DevOps Engineer",
        conhecimentos: ["Docker", "Kubernetes", "AWS", "CI/CD"],
        remuneracao: 7000,
        beneficios: ["Plano de Saúde", "PLR", "Vale Refeição"],
        status: "ativo"
    },
    {
        id: 5,
        titulo: "Product Owner",
        conhecimentos: ["Scrum", "Kanban", "Gestão de Produto"],
        remuneracao: 8000,
        beneficios: ["Plano de Saúde", "Stock Options", "Vale Transporte"],
        status: "ativo"
    }
];

const jobController = {
    create(req, res) {
        const [job, error] = validateCreateJobDto(req.body)
        if (error) return res.status(400).send(error)

        const novaVaga = {
            id: jobs.length + 1,
            ...job
        };

        jobs.push(novaVaga);
        res.status(201).json(novaVaga);
    },

    findAll(_, res) {
        res.status(200).json(jobs)
    },

    findById(req, res) {
        const [id, error] = validateIdParams(req.params)
        if (error) return res.status(400).send('ID inválido');

        const index = jobs.findIndex(v => v.id === id);
        if (index === -1) {
            return res.status(404).send('Vaga não encontrada')
        }

        res.status(200).json(jobs[index]);
    },

    delete(req, res) {
        const [id, error] = validateIdParams(req.params)
        if (error) return res.status(400).send('ID inválido');

        const index = jobs.findIndex(v => v.id === id);
        if (index === -1) {
            return res.status(404).send('Vaga não encontrada')
        }

        const deleted = jobs.splice(index, 1);
        res.status(200).json({ mensagem: 'Vaga removida com sucesso', vaga: deleted[0] });
    },

    update(req, res) {
        const [id, error] = validateIdParams(req.params)
        if (error) return res.status(400).send('ID inválido');

        const index = jobs.findIndex(v => v.id === id);
        if (index === -1) {
            return res.status(404).send('Vaga não encontrada')
        }


    },
}

module.exports = jobController;