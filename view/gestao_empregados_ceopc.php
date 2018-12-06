<?php

    // VERIFICA SE EXISTEM ERROS DE EXECUÇÃO NO CÓDIGO
    ini_set('display_errors',1);

    // CHAMA OS ARQUIVOS DE VERIFICAÇÃO DE EXISTÊNCIA DAS CLASSES
    require_once("../../config_classes_globais.php");

    // INSTANCIA O OBJETO EMPREGADO CEOPC
	$empregadoCeopc = new EmpregadoCeopc();
    $empregadoCeopc->setIdCelula(5); 
    
    $arrayListaEmpregadosCeopc = json_decode($empregadoCeopc->listarEmpregadosCeopc());
    // $arrayListaCelulasCeopc = json_decode($empregadoCeopc->listarCelulasCeopc());

    // var_dump($arrayListaEmpregadosCeopc);
    // var_dump($arrayListaCelulasCeopc);

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
	<link rel="stylesheet" type="text/css" href="../../esteiracomex2/bootstrap/css/bootstrap.min.css"/>
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.css">
    <title>Gestão dos Empregados CEOPC</title>
</head>
<body>

	<br>
	<div class="container">
		<table id="tabelaEmpregado" class="table table-striped compact" ></table>
	</div>
<!-- Modal Alterar e Visualizar--> 

	<div class="modal fade" id="trocaCelulaModal" tabindex="-1" role="dialog" aria-labelledby="alteraCelulaEmpregado">
		<div class="modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title" id="EmailModalLabel">Alteração de Célula - Empregado CEOPC</h4>
				</div>
				<div class="modal-body with-padding">
					<div class="tabbable">
						<form method="get" action="../controller/atualizaCelulaEmpregado.php" name="formCadastro">
							<div class="row">
								<div id="modalEmpregado"></div>
								<div class="col-sm-12">
									<label class="control-label">Nome do Empregado</label>
									<input placeholder="..." id="nomeEmpregado" class="form-control" type="text" readonly>
								</div>
								<div class="col-sm-4">
									<label class="control-label">Matricula</label>
									<input placeholder="..." name="matriculaEmpregado" id="matriculaEmpregado" class="form-control" type="text" readonly>
								</div>
								<div class="col-sm-4">
									<label class="control-label">Perfil</label>
									<input placeholder="..."  id="perfilEmpregado"class="form-control" type="text" readonly>
								</div>
								<div class="col-sm-4">
									<label class="control-label">Célula Atual</label>
									<input placeholder="..." name="celulaAntiga" id="celulaAntiga"class="form-control" type="text" readonly>
								</div>
								<div class="col-sm-12">
									<label class="control-label">Nova Célula</label>
									<select name="idCelula" id="idCelula" class="form-control">
									<option disabled selected value>Selecione a nova célula</option>
									</select>
										
								</div>
							</div> <!--fecha div tabbable -->
							<div class="modal-footer">
								<button type="submit" id="salvarAltera" class="btn btn-primary" >Alterar Célula</button>
								<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
							</div>
						</form>
					</div> <!-- footer -->
				</div><!-- footer modal-body with-padding -->
			</div>
		</div>
	</div>
	<script src="../../esteiracomex2/plugins/jQuery/jquery-2.2.3.min.js"></script>
	<script src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>
	<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.js"></script>
	<script src="../../esteiracomex2/bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript" charset="utf8" src="js/gestao_empregados_ceopc.js"></script>
</body>
</html>

