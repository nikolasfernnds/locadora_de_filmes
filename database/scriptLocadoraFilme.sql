CREATE TABLE tbl_filme (
	filme_id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(100) NOT NULL,
	sinopse TEXT NULL,
	data_lancamento DATE NULL,
	duracao TIME NOT NULL,
	orcamento DECIMAL(11, 2) NOT NULL,
	trailer VARCHAR(200) NULL,
	capa VARCHAR(200) NOT NULL
);



	INSERT INTO	tbl_filme(nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa)
		VALUES	("Scarface",
				"Um criminoso cubano exilado (Al Pacino) vai para Miami e em pouco tempo 
				está trabalhando para um chefão das drogas. Sua ascensão na quadrilha é meteórica,
				mas quando ele começa a sentir interesse na amante do chefe (Michelle Pfeiffer) 
				este manda matá-lo. No entanto ele escapa do atentado, mata o mandante do crime, 
				fica com a amante dele - mas simultaneamente sente desejos incestuosos por sua irmã 
				(Mary Elizabeth Mastrantonio) - e assume o controle da quadrilha. Em pouco tempo 
				ele ganha mais dinheiro do que jamais sonhou. No entanto ele está na mira dos agentes 
				federais, que o pegam quando ele está trocando dinheiro. Mas seu problema pode ser
				resolvido se ele fizer um serviço em Nova York para um grande traficante e pessoas 
				influentes, que podem manipular o poder para ajudá-lo. Porém, a missão toma um rumo 
				inesperado quando, para concretizá-la, ele precisa matar crianças.",
				"1984-01-13",
				"2:45",
				25000000,
				"https://player.adorocinema.com/19349414.html",
				"https://m.media-amazon.com/images/I/618ez5spR3L._UF1000,1000_QL80_.jpg");
	
	INSERT INTO	tbl_filme(nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa)
		VALUES	("Toy Story 2",
				"Em Toy Story 2, Woody (Tom Hanks) tenta salvar um brinquedo que acaba indo parar num 
				bazar de usados e termina por ser sequestrado por um colecionador de brinquedos, que 
				pretende vendê-lo a um museu japonês. Na casa do sequestrador, descobre que foi o 
				protagonista de um famoso seriado da TV de décadas atrás e conhece os demais integrantes 
				de sua coleção. Enquanto isso, os demais brinquedos, liderador por Buzz Lightyear (Tim Allen), 
				partem numa atrapalhada operação de resgate.",
				"1999-12-17",
				"1:33",
				90000000,
				"https://player.adorocinema.com/19378096.html",
				"https://i0.wp.com/vertentesdocinema.com/wp-content/uploads/2021/07/toy-story-2-2.jpeg?fit=1000%2C1500&ssl=1");