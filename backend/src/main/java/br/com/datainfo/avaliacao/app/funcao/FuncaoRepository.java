package br.com.datainfo.avaliacao.app.funcao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
interface FuncaoRepository extends JpaRepository<Funcao, Long> {

}
