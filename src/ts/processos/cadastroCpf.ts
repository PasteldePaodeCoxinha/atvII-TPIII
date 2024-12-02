import Processo from "../abstracoes/processo";
import { TipoDocumento } from "../enumeracoes/TipoDocumento";
import Cliente from "../modelos/cliente";
import Documento from "../modelos/documento";

export default class CadastroCpf extends Processo {
    private cliente: Cliente
    private static instancia: CadastroCpf
    private constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
    }

    public static obterCadastroCpf(cliente: Cliente) {
        if (!CadastroCpf.instancia) {
            this.instancia = new CadastroCpf(cliente)
        }
        return this.instancia
    }

    processar(): void {
        let numero = ""
        while (true) {
            numero = this.entrada.receberTexto('Digite apenas os números do CPF: ')
            if (numero.length !== 11 || isNaN(Number(numero).valueOf())) {
                console.log("Input inválido! Digite de novo");
            } else {
                break
            }
        }
        const dataExpedicao = this.entrada.receberData('Qual a data de expedição do CPF')
        let cpf = Documento.obterDocumento(numero, TipoDocumento.CPF, dataExpedicao)
        this.cliente.Documentos.push(cpf)
    }
}