type Endereco = {
    cep: string,
    rua: string,
    numero: number
    complemento?: string,
    bairro: string,
    cidade: string,
    estado: string
}

type Usuario = {
    nome: string,
    email: string,
    cpf: string,
    profissao?: string,
    endereco?: Endereco | null
}

const fs = require('fs');

const lerArquivo = (): Usuario[] => {
    return JSON.parse(fs.readFileSync('./bd.json'));
};

const escreverArquivo = (conteudo: any): void => {
    fs.writeFileSync('./bd.json', JSON.stringify(conteudo));
};

const cadastrarUsuario = (dados: Usuario): Usuario => {
    const cadastros = lerArquivo() as Usuario[]

    if (!dados.endereco) {
        dados.endereco = null
    }

    cadastros.push(dados)
    escreverArquivo(cadastros)
    return dados
};

const listarUsuarios = (): Usuario[] => {
    const listaDeUsuarios: Usuario[] = lerArquivo()
    return listaDeUsuarios
}

const detalharUsuario = (cpf: string): Usuario | void => {
    const listaDeUsuarios: Usuario[] = listarUsuarios()

    const usuarioEncontrado: Usuario | undefined = listaDeUsuarios.find((usuario) => {
        return usuario.cpf === cpf
    })

    if (!usuarioEncontrado) {
        console.log('Usuário não encontrado!');
        return
    }
    return usuarioEncontrado
}

const atualizarUsuario = (dados: Usuario): Usuario => {
    if (!dados.endereco) {
        dados.endereco = null
    }

    const listaDeUsuarios: Usuario[] = listarUsuarios()

    const usuarioEncontrado: number = listaDeUsuarios.findIndex((usuario) => {
        return usuario.cpf === dados.cpf
    });

    listaDeUsuarios[usuarioEncontrado] = dados;

    escreverArquivo(listaDeUsuarios);

    return dados;
}

const excluirUsuario = (cpf: string): Usuario | void => {
    const listaDeUsuarios: Usuario[] = listarUsuarios();
    const usuarioEncontrado: Usuario | void = detalharUsuario(cpf);

    if (!usuarioEncontrado) {
        return
    }

    const indexUsuario = listaDeUsuarios.findIndex((usuario) => {
        return usuario.cpf === cpf;
    });

    listaDeUsuarios.splice(indexUsuario)

    console.log(usuarioEncontrado);

    escreverArquivo(listaDeUsuarios);

    return usuarioEncontrado
}

const filtrarUsuario = (profissao: string): Usuario[] | void => {
    const listaDeUsuarios: Usuario[] = listarUsuarios().filter((usuario) => {
        return usuario.profissao === profissao
    })

    console.log(listaDeUsuarios);
    return listaDeUsuarios;
}

filtrarUsuario('Programador')

// excluirUsuario("3")

// detalharUsuario("1");

// atualizarUsuario({
//     nome: "Lucas Alcantara",
//     email: "lucasalcantara@email.com",
//     cpf: "1",
//     profissao: "Programador BackEnd",
//     endereco: {
//         cep: "00000-001",
//         rua: "Rua B",
//         complemento: "Casa 3",
//         numero: 56,
//         bairro: "Bairro",
//         cidade: "De Deus",
//         estado: "Minas Gerais"
//     }
// });

// console.log(listarUsuarios());

// console.log(cadastrarUsuario({
//     nome: "André",
//     email: "andre@email.com",
//     cpf: "3",
//     profissao: "Programador"
// }));
