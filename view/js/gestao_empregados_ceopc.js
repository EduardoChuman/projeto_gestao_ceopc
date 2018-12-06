var _tabelaListaEmpregado;
var _tabelaEmpregado;
var data;


$(document).ready(function () {
    inicializarTabelaEmails();
    atualizarDataTable();
    carregaListaEmpregados();
    carregaListaCelulas();
    alterarCelula();
});


function carregaListaEmpregados() {
 
   $.ajax({
        method: "GET",
        url: "http://www.ceopc.hom.sp.caixa/api/public/gestao_empregados_ceopc.php/lista_empregados_ceopc/",
        dataType: "json",
        // async: false
    }).done(function (json) {

       atualizarDataTable(json);
       criarMapaEmpregados(json);
                    
    }).fail(function (jqXHR, textStatus, errorThrown) {

        console.log("deu erro")
        alert('Problemas ao tentar salvar!\n' + jqXHR.status + ' ' + jqXHR.statusText + errorThrown);

    });
}

function carregaListaCelulas() {
 
   $.ajax({
        method: "GET",
        url: "http://www.ceopc.hom.sp.caixa/api/public/gestao_empregados_ceopc.php/lista_celulas_ceopc/",
        dataType: "json",
        // async: false
    }).done(function (json) {

        data = json
                    
    }).fail(function (jqXHR, textStatus, errorThrown) {

        console.log("deu erro")
        alert('Problemas ao tentar salvar!\n' + jqXHR.status + ' ' + jqXHR.statusText + errorThrown);

    });
}

function criarMapaEmpregados(json){
   
   _tabelaEmpregado = new Map();

    $.each(json, function(i, item){
        _tabelaEmpregado.set(item.MATRICULA, item);
    });
    
}


function atualizarDataTable(lista) {
    _tabelaListaEmpregado.clear().draw(false);
    if (lista != undefined && lista != "") {
        
        _tabelaListaEmpregado.rows.add(lista).draw(true);
    }
}

function alterarCelula() {
    $('#tabelaEmpregado').on('click', 'tbody .btn-alterar', function () {
        //pega a TR na datatable
        var linha = _tabelaListaEmpregado.row($(this).closest("tr")).data();

        if (linha === undefined) return;

                var empregado = _tabelaEmpregado.get(linha.MATRICULA);

        var empregado = _tabelaEmpregado.get(linha.MATRICULA);
        // var tituloModal = document.querySelector("#alteraCelulaEmpregado");
        // tituloModal.textContent = "Alteração de Célula - Empregado CEOPC"; 
        
        $("#matriculaEmpregado").val(empregado.MATRICULA);
        // $("#nomeEmpresa").attr("readonly", true); 
        $("#nomeEmpregado").val(empregado.NOME);
        // $("#nomeEmpregado").attr("readonly", true); 
        $("#perfilEmpregado").val(empregado.NIVEL_ACESSO);
        // $("#nomeAgencia").attr("readonly", true);      
        $("#celulaAntiga").val(empregado.NOME_CELULA);
        // $("#emailPrincipal").attr("readonly", true); 

        
        var $select = $('#idCelula');
        $.each(data, function(i, val){
            $select.append($('<option />', { value: data[i].ID, text: data[i].NOME_CELULA }));
        });

        $("#salvarAltera").show();

        $("#trocaCelulaModal").modal('show');

        

    });
}

function inicializarTabelaEmails() {
    _tabelaListaEmpregado = $('#tabelaEmpregado').DataTable({
        // Posiciona o campo pesquiar acima da datatable
        // sDom: '<"top">rt<"bottom"ifp><"clear">',
        language: {
            "lengthMenu": "Mostrar _MENU_ registros por página",
            "zeroRecords": "Nada encontrato - desculpe",
            "info": "Exibindo _START_ a _END_ de _TOTAL_ registros",
            "infoEmpty": "Sem registroa para exibir",
            "infoFiltered": "(filtrado de _MAX_ total registros)",
            "search": "Procurar: ",
            paginate: {
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
        //data: listaComApi,
        //segunda forma: - Mas testa a primeira antes
        //ajax : "http://www.ceopc.sp.caixa/api/public/index.php/antecipadosTabela2/",
        columns: 
        [
            { data: "MATRICULA", title: "Matricula", class: "dt-center", width: "10%"}, //
            { data: "NOME", title: "Nome", width: "65%"}, //, 
            { data: "NOME_CELULA", title: "Célula", class: "dt-center", width: "15%" }, //
            // aqui vamos criar a coluna de ação
            { data: "Acao", // esse não influencia nada
                title: "Nova Célula",
                render: function()
                {
                    var retorno = ""; 
                    //botao alterar
                    btAlterar = "<a rel='tooltip' class='btn btn-default btn-xs btn-alterar' title='Alterar'><span class='glyphicon glyphicon-pencil' ></span></a>";
                    // retorno = "<button type='submit'>TROCAR</button>"
                    
                    // "<select align='center' name='novaCelula'><option disabled selected value>SELECIONE A CELULA</option><option value='1'>ADM</option><option value='2'>BACK OFFICE</option><option value='3'>BNDES</option><option value='4'>COORDENADORES</option><option value='5'>MIDDLE OFFICE</option><option value='6'>TI</option></select>";
                    
                    // btHistorico = "<a rel='tooltip' class='btn btn-default btn-xs btn-historico' title='Histórico'><span  class='glyphicon glyphicon-book' ></span></a>&nbsp;";
                    
                    // 
                    // //Coloca a ordem
                    retorno = btAlterar;  //+ +btHistorico; btVisualizar;
                    //deve funcionar :) testa..
                    return retorno;
                },
                width: "10%",
                class: "dt-center"
            }            
        ]
        
    });
}