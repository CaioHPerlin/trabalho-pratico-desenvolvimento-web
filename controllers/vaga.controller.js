const vagas = [
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

const vagaController = {
    create(_, res) {
        res.status(500).send('Not yet implemented')
    },

    findAll(_, res) {
        res.status(500).send('Not yet implemented')

    },

    findByTitle(_, res) {
        res.status(500).send('Not yet implemented')

    },

    delete(_, res) {
        res.status(500).send('Not yet implemented')
    },

    update(_, res) {
        res.status(500).send('Not yet implemented')

    },
}

module.exports = vagaController;