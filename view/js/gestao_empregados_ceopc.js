var _tabelaListaEmpregado;
var _tabelaEmpregado;
var _data;
var _dadosEmpregado;

$(document).ready(function () 
{
    inicializarTabelaEmails();
    atualizarDataTable();
    carregaListaEmpregados();
    carregaListaCelulas();
    carregaDadosEmpregado();
    alterarCelula();
});

function inicializarTabelaEmails() 
{
    _tabelaListaEmpregado = $('#tabelaEmpregado').DataTable(
    {
        language: 
        {
            "lengthMenu": "Mostrar _MENU_ registros por página",
            "zeroRecords": "Nada encontrato - desculpe",
            "info": "Exibindo _START_ a _END_ de _TOTAL_ registros",
            "infoEmpty": "Sem registros para exibir",
            "infoFiltered": "(filtrado de _MAX_ total registros)",
            "search": "Procurar: ",
            paginate: 
            {
                "previous": "Página anterior",
                "next": "Próxima página",
            },            
        },
        scrollY: "630px",
        scrollCollapse: true,
        paging: true,
        lengthChange: true,
        pageLength: 20,
        bSort: true,
        order: [0, "asc"],
        bAutoWidth: false,
        responsive: true,
        columns: 
        [
            { data: "NOME", title: "Nome", name:"nome", width: "50%"}, 
            { data: "MATRICULA", title: "Matricula", class: "dt-center", width: "10%"}, 
            { data: "NOME_CELULA", title: "Célula", class: "dt-center", width: "20%" },
            // aqui vamos criar a coluna de ação
            { data: "BOTAO",
                title: "Nova Célula",
                render: function()
                {
                    return "<a rel='tooltip' class='btn btn-default btn-xs btn-alterar' title='Alterar'><span class='glyphicon glyphicon-pencil' ></span></a>";
                },
                width: "10%",
                class: "dt-center"
            }
        ]     
    });
}

function atualizarDataTable(lista)
{
    _tabelaListaEmpregado.clear().draw(false);
    if (lista != undefined && lista != "") 
    {
        _tabelaListaEmpregado.rows.add(lista).draw(true);
    }
}

function carregaListaEmpregados() 
{
   $.ajax(
    {
        method: "GET",
        url: "http://www.ceopc.hom.sp.caixa/api/public/gestao_empregados_ceopc.php/lista_empregados_ceopc/",
        dataType: "json",
    })
    .done(function (json) 
    {
       atualizarDataTable(json);
       criarMapaEmpregados(json);                  
    })
    .fail(function (jqXHR, textStatus, errorThrown) 
    {
        console.log("deu erro")
        alert('Problemas ao tentar salvar!\n' + jqXHR.status + ' ' + jqXHR.statusText + errorThrown);
    });
}

function carregaListaCelulas() 
{
    $.ajax(
    {
        method: "GET",
        url: "http://www.ceopc.hom.sp.caixa/api/public/gestao_empregados_ceopc.php/lista_celulas_ceopc/",
        dataType: "json",
    })
    .done(function (json) 
    {
        _data = json                   
    })
    .fail(function (jqXHR, textStatus, errorThrown) 
    {
        console.log("deu erro")
        alert('Problemas ao tentar salvar!\n' + jqXHR.status + ' ' + jqXHR.statusText + errorThrown);
    });
}

function carregaDadosEmpregado() 
{
    $.ajax(
    {
        method: "GET",
        url: "http://www.ceopc.hom.sp.caixa/api/public/atendimento_web.php/dados_empregado_ceopc/",
        dataType: "json",
    })
    .done(function (json) 
    {
        _dadosEmpregado = json;

        console.log(_dadosEmpregado);
    })
    .fail(function (jqXHR, textStatus, errorThrown) 
    {
        console.log("deu erro")
        alert('Problemas ao tentar salvar!\n' + jqXHR.status + ' ' + jqXHR.statusText + errorThrown);
    });
}

function alterarCelula() 
{
    $('#tabelaEmpregado').on('click', 'tbody .btn-alterar', function () 
    {
        //pega a TR na datatable
        var linha = _tabelaListaEmpregado.row($(this).closest("tr")).data();

        if (linha === undefined) return;

        var empregado = _tabelaEmpregado.get(linha.MATRICULA);
        
        $("#matriculaEmpregado").val(empregado.MATRICULA);
        $("#nomeEmpregado").val(empregado.NOME);
        $("#perfilEmpregado").val(empregado.NIVEL_ACESSO);     
        $("#celulaAntiga").val(empregado.NOME_CELULA); 
        
        var $select = $('#idCelula');
        
        $.each(_data, function(i, val)
        {
            $select.append($('<option />', { value: _data[i].ID, text: _data[i].NOME_CELULA }));
        });
        _data = ""; // LIMPA A VARIÁVEL PARA EVITAR A DUPLICIDADE DE OPÇÕES NO MODAL

        $("#salvarAltera").show();
        $("#trocaCelulaModal").modal('show');
    });
}

function criarMapaEmpregados(json)
{ 
    _tabelaEmpregado = new Map();
    $.each(json, function(i, item)
    {
        _tabelaEmpregado.set(item.MATRICULA, item);
    });
}