CREATE TABLE Usuario(
	id int primary key identity(1,1),
	username varchar(20) not null,
	senha varchar(10) not null,
	role varchar(20) null
)
CREATE TABLE Produto(
	id int primary key identity(1,1) not null,
	nome VARCHAR (20) not null,
	imagem VARCHAR (20) null,
	preco REAL not null,
	descricao VARCHAR (30) null,
	quantidade INT null,
)