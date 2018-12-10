<?php
    // VERIFICA SE EXISTEM ERROS DE EXECUÇÃO NO CÓDIGO
    ini_set('display_errors',1);
    
    // CHAMA OS ARQUIVOS DE VERIFICAÇÃO DE EXISTÊNCIA DAS CLASSES
    require_once("../../config_classes_globais.php");

    // INSTANCIA OBJETO DA CLASSE 
    $empregado = new EmpregadoCeopc();
    $empregado->setMatricula('C068508'); // FORÇA A MATRICULA DE UM GESTOR PARA TESTES

	if($empregado->getMatricula() == 'C061940')
    {
        $empregado->limpaEventualidadeCeopc($_GET['idCelula']);
    	$empregado->atualizaEventualidadeCeopc($_GET['matriculaEmpregado']);
    }
    else
    {
        $empregado->limpaEventualidadeCelula($_GET['idCelula']);
    	$empregado->atualizaEventualidadeCelula($_GET['matriculaEmpregado']);
    }

    
    
    echo "A eventualidade foi atualizada com sucesso.";
?>