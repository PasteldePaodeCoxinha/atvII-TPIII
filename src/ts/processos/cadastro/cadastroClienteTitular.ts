import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import Cliente from "../../modelos/cliente";
import Telefone from "../../modelos/telefone";
import CadastrarDocumentosCliente from "./cadastrarDocumentosCliente";
import CadastroEnderecoTitular from "./cadastroEnderecoTitular";

export default class CadastroClienteTitular extends Processo {

    constructor() {
        super()
    }

    processar(): void {
        console.log('Iniciando o cadastro de um novo cliente...')
        let nome = this.entrada.receberTexto('Qual o nome do novo cliente: ')
        let nomeSocial = this.entrada.receberTexto('Qual o nome social do novo cliente: ')
        let dataNascimento = this.entrada.receberData('Qual a data de nascimento')
        let cliente = new Cliente(nome, nomeSocial, dataNascimento)

        this.processo = new CadastroEnderecoTitular(cliente)
        this.processo.processar()

        let ddd = this.entrada.receberTexto("Digite o ddd do telefone: ")
        let numero = this.entrada.receberTexto("Digite o número do telefone: ")
        let telefone = new Telefone(ddd, numero)
        cliente.AddTelefone = telefone

        this.processo = new CadastrarDocumentosCliente(cliente)
        this.processo.processar()

        let armazem = Armazem.InstanciaUnica
        armazem.Clientes.push(cliente)

        console.log('Finalizando o cadastro do cliente...')
    }
}