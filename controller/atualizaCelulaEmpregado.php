<?php
    // VERIFICA SE EXISTEM ERROS DE EXECUÇÃO NO CÓDIGO
    ini_set('display_errors',1);
    
    // CHAMA OS ARQUIVOS DE VERIFICAÇÃO DE EXISTÊNCIA DAS CLASSES
    require_once("../../config_classes_globais.php");

    // INSTANCIA OBJETO DA CLASSE 
    $empregado = new EmpregadoCeopc();

    $empregado->atualizaCelulaEmpregados($_GET['idCelula'], $_GET['matriculaEmpregado']);
    
    echo "A célula do empregado foi atualizada com sucesso.";
?>

