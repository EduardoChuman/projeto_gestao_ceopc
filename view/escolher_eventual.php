<?php
    // VERIFICA SE EXISTEM ERROS DE EXECUÇÃO NO CÓDIGO
    ini_set('display_errors',1);

    // CHAMA OS ARQUIVOS DE VERIFICAÇÃO DE EXISTÊNCIA DAS CLASSES
    require_once("../../config_classes_globais.php");

    // INSTANCIA O OBJETO EMPREGADO CEOPC
	$empregadoCeopc = new EmpregadoCeopc();
	$empregadoCeopc->setMatricula('C068508'); // FORÇA A MATRICULA DE UM GESTOR PARA TESTES

	$empregadoCeopc->setNivelAcesso('GESTOR');
	$empregadoCeopc->setEventual('SIM');

	if ($empregadoCeopc->getNivelAcesso() != "GESTOR")  
	{ 
		if($empregadoCeopc->getEventual() != "SIM")
		{
			header("location:http://www.geopc.mz.caixa/esteiracomex/sem_acesso.php");
			exit;
		}
	}
?>
<!DOCTYPE html>
<html lang="pt-br">
	<head>
	    <meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<link rel="stylesheet" type="text/css" href="../../esteiracomex2/bootstrap/css/bootstrap.min.css"/>
		<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.css">
	    <title>Escolher Eventual</title>
	</head>
	<body>
		<br>
		<div class="container">
            <table id="tabelaEmpregado" class="table table-striped compact" ></table>
		</div>
		<!-- Modal para alterar a célula--> 
		<div class="modal fade" id="trocaCelulaModal" tabindex="-1" role="dialog" aria-labelledby="alteraCelulaEmpregado">
			<div class="modal-dialog modal-md" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="EmailModalLabel">Alteração de Eventual</h4>
					</div>
					<div class="modal-body with-padding">
						<div class="tabbable">
							<form method="get" action="../controller/atualizaEventual.php" name="formCadastro">
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
										<input placeholder="..."  id="perfilEmpregado" class="form-control" type="text" readonly>
									</div>
									<div class="col-sm-4">
										<label class="control-label">Célula</label>
										<input placeholder="..." id="nomeCelula" class="form-control" type="text" readonly>
                                        <input name="idCelula" id="idCelula" type="hidden" readonly>
                                    </div>
									<div class="col-sm-12">
										<label class="control-label">Deseja que esse empregado seja seu novo Eventual?</label>
										<select name="eventual" class="form-control">
											<option disabled selected value></option>
											<option value='SIM'>SIM</option>
											<option value='NAO'>NÃO</option>
										</select>
									</div>
								</div>
								<div class="modal-footer">
									<button type="submit" id="salvarAltera" class="btn btn-primary" >Definir Eventual</button>
									<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
		<script src="../../esteiracomex2/plugins/jQuery/jquery-2.2.3.min.js"></script>
		<script src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>
		<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.js"></script>
		<script src="../../esteiracomex2/bootstrap/js/bootstrap.min.js"></script>
		<script type="text/javascript" charset="utf8" src="js/escolhe_eventual.js"></script>
	</body>
</html>