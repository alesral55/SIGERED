USE [master]
GO
/****** Object:  Database [SIGERED_PRO_CIEGOS]    Script Date: 6/11/2024 11:55:10 ******/
CREATE DATABASE [SIGERED_PRO_CIEGOS]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'SIGERED_PRO_CIEGOS', FILENAME = N'/cloudclusters/mssql/data/SIGERED_PRO_CIEGOS.mdf' , SIZE = 73728KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'SIGERED_PRO_CIEGOS_log', FILENAME = N'/cloudclusters/mssql/data/SIGERED_PRO_CIEGOS_log.ldf' , SIZE = 73728KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [SIGERED_PRO_CIEGOS] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [SIGERED_PRO_CIEGOS].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [SIGERED_PRO_CIEGOS] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [SIGERED_PRO_CIEGOS] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [SIGERED_PRO_CIEGOS] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [SIGERED_PRO_CIEGOS] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [SIGERED_PRO_CIEGOS] SET ARITHABORT OFF 
GO
ALTER DATABASE [SIGERED_PRO_CIEGOS] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [SIGERED_PRO_CIEGOS] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [SIGERED_PRO_CIEGOS] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [SIGERED_PRO_CIEGOS] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [SIGERED_PRO_CIEGOS] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [SIGERED_PRO_CIEGOS] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [SIGERED_PRO_CIEGOS] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [SIGERED_PRO_CIEGOS] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [SIGERED_PRO_CIEGOS] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [SIGERED_PRO_CIEGOS] SET  ENABLE_BROKER 
GO
ALTER DATABASE [SIGERED_PRO_CIEGOS] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [SIGERED_PRO_CIEGOS] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [SIGERED_PRO_CIEGOS] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [SIGERED_PRO_CIEGOS] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [SIGERED_PRO_CIEGOS] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [SIGERED_PRO_CIEGOS] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [SIGERED_PRO_CIEGOS] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [SIGERED_PRO_CIEGOS] SET RECOVERY FULL 
GO
ALTER DATABASE [SIGERED_PRO_CIEGOS] SET  MULTI_USER 
GO
ALTER DATABASE [SIGERED_PRO_CIEGOS] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [SIGERED_PRO_CIEGOS] SET DB_CHAINING OFF 
GO
ALTER DATABASE [SIGERED_PRO_CIEGOS] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [SIGERED_PRO_CIEGOS] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [SIGERED_PRO_CIEGOS] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [SIGERED_PRO_CIEGOS] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [SIGERED_PRO_CIEGOS] SET QUERY_STORE = ON
GO
ALTER DATABASE [SIGERED_PRO_CIEGOS] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [SIGERED_PRO_CIEGOS]
GO
/****** Object:  Table [dbo].[accesosPorRol]    Script Date: 6/11/2024 11:55:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[accesosPorRol](
	[idAcceso] [int] IDENTITY(1,1) NOT NULL,
	[descripcionAcceso] [nvarchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[idAcceso] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[alumnos]    Script Date: 6/11/2024 11:55:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[alumnos](
	[idAlumno] [int] IDENTITY(1,1) NOT NULL,
	[cui] [nvarchar](30) NOT NULL,
	[idHorario] [int] NOT NULL,
	[residenteLocal] [char](1) NULL,
	[idTipoDoc] [int] NULL,
	[idGrupoEtnico] [int] NOT NULL,
	[discapacidad] [char](1) NOT NULL,
	[idDiscapacidad] [int] NULL,
	[esColaborador] [char](1) NOT NULL,
	[areaDeTrabajo] [nvarchar](255) NULL,
	[imgDPI] [nvarchar](2024) NULL,
	[idSistemaPago] [int] NULL,
	[idPago] [int] NOT NULL,
	[idCurso] [int] NOT NULL,
	[idCicloEscolar] [int] NOT NULL,
	[estado] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[idAlumno] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[asignacionDeCursos]    Script Date: 6/11/2024 11:55:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[asignacionDeCursos](
	[idAsignacion] [int] IDENTITY(1,1) NOT NULL,
	[cui] [nvarchar](30) NOT NULL,
	[idCurso] [int] NOT NULL,
	[idRol] [int] NOT NULL,
	[idHorario] [int] NOT NULL,
	[idSeccion] [int] NOT NULL,
	[idCicloEscolar] [int] NOT NULL,
	[estado] [char](1) NULL,
PRIMARY KEY CLUSTERED 
(
	[idAsignacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[asignacionDinamica]    Script Date: 6/11/2024 11:55:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[asignacionDinamica](
	[idAsignacionDinamica] [int] IDENTITY(1,1) NOT NULL,
	[idTarea] [int] NULL,
	[Puntaje] [numeric](10, 2) NULL,
PRIMARY KEY CLUSTERED 
(
	[idAsignacionDinamica] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[cicloEscolar]    Script Date: 6/11/2024 11:55:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[cicloEscolar](
	[idCicloEscolar] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [nvarchar](300) NOT NULL,
	[fecharInicio] [date] NULL,
	[fechaFin] [date] NULL,
	[anio] [int] NOT NULL,
	[estado] [char](1) NULL,
PRIMARY KEY CLUSTERED 
(
	[idCicloEscolar] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[cursos]    Script Date: 6/11/2024 11:55:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[cursos](
	[idCurso] [int] IDENTITY(1,1) NOT NULL,
	[nombreCurso] [nvarchar](200) NOT NULL,
	[descripcionCurso] [nvarchar](500) NULL,
	[estado] [char](1) NULL,
	[idNivel] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[idCurso] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[cursosDisponibles]    Script Date: 6/11/2024 11:55:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[cursosDisponibles](
	[idCursoDispobible] [int] IDENTITY(1,1) NOT NULL,
	[idCurso] [int] NULL,
	[requisito] [int] NULL,
	[fechaInicio] [date] NULL,
	[estado] [char](1) NULL,
PRIMARY KEY CLUSTERED 
(
	[idCursoDispobible] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[descripcionEscalaDeRango]    Script Date: 6/11/2024 11:55:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[descripcionEscalaDeRango](
	[idDescripcionEscalaDeRango] [int] IDENTITY(1,1) NOT NULL,
	[idEscalaDeRango] [int] NOT NULL,
	[descripcionCriterio] [nvarchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[idDescripcionEscalaDeRango] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[descripcionListaDeCotejo]    Script Date: 6/11/2024 11:55:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[descripcionListaDeCotejo](
	[idDescripcionListaDeCotejo] [int] IDENTITY(1,1) NOT NULL,
	[idListaDeCotejo] [int] NOT NULL,
	[descripcionCriterio] [nvarchar](500) NULL,
PRIMARY KEY CLUSTERED 
(
	[idDescripcionListaDeCotejo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[descripcionRubrica]    Script Date: 6/11/2024 11:55:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[descripcionRubrica](
	[idDescripcionRubrica] [int] IDENTITY(1,1) NOT NULL,
	[idRubirca] [int] NOT NULL,
	[descripcionCriterio] [nvarchar](255) NULL,
	[debeMejorar] [nvarchar](255) NULL,
	[valorDebeMejorar] [numeric](18, 0) NULL,
	[suficiente] [nvarchar](255) NULL,
	[valorSuficiente] [numeric](18, 0) NULL,
	[regular] [nvarchar](255) NULL,
	[valorRegular] [numeric](18, 0) NULL,
	[bueno] [nvarchar](255) NULL,
	[valorBueno] [numeric](18, 0) NULL,
	[exelente] [nvarchar](255) NULL,
	[valorExelente] [numeric](18, 0) NULL,
	[dimension] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[idDescripcionRubrica] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[discapacidades]    Script Date: 6/11/2024 11:55:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[discapacidades](
	[idDiscapacidad] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [nvarchar](100) NOT NULL,
	[descripcion] [nvarchar](300) NULL,
	[estado] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[idDiscapacidad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[escalaDeRango]    Script Date: 6/11/2024 11:55:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[escalaDeRango](
	[idEscalaDeRango] [int] IDENTITY(1,1) NOT NULL,
	[idTarea] [int] NULL,
	[puntaje] [decimal](18, 0) NULL,
PRIMARY KEY CLUSTERED 
(
	[idEscalaDeRango] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[grupoEtnico]    Script Date: 6/11/2024 11:55:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[grupoEtnico](
	[idGrupo] [int] IDENTITY(1,1) NOT NULL,
	[nombreGrupo] [nvarchar](100) NOT NULL,
	[Descripcion] [nvarchar](300) NULL,
	[estado] [char](1) NULL,
PRIMARY KEY CLUSTERED 
(
	[idGrupo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[horarios]    Script Date: 6/11/2024 11:55:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[horarios](
	[idHorario] [int] IDENTITY(1,1) NOT NULL,
	[horario] [nvarchar](100) NOT NULL,
	[descripcion] [nvarchar](300) NULL,
	[estado] [char](1) NULL,
	[idCurso] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[idHorario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[listaDeCotejo]    Script Date: 6/11/2024 11:55:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[listaDeCotejo](
	[idListaDeContejo] [int] IDENTITY(1,1) NOT NULL,
	[idTarea] [int] NOT NULL,
	[puntaje] [numeric](18, 0) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[idListaDeContejo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[niveles]    Script Date: 6/11/2024 11:55:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[niveles](
	[idNivel] [int] NOT NULL,
	[nombreNivel] [nvarchar](255) NULL,
	[estado] [char](1) NULL,
PRIMARY KEY CLUSTERED 
(
	[idNivel] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[notas]    Script Date: 6/11/2024 11:55:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[notas](
	[idNota] [int] IDENTITY(1,1) NOT NULL,
	[idTarea] [int] NOT NULL,
	[idCurso] [int] NOT NULL,
	[descripcion] [nvarchar](300) NULL,
	[CUIalumno] [nvarchar](30) NOT NULL,
	[nota] [decimal](18, 0) NULL,
	[fechaDeAsignacion] [datetime] NULL,
	[CUIcolaborador] [nvarchar](30) NOT NULL,
	[idTipoCalificacion] [int] NULL,
	[idFormatoCalificaion] [int] NULL,
	[idSeccion] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[idNota] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[notasFinales]    Script Date: 6/11/2024 11:55:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[notasFinales](
	[idNotaFinal] [int] IDENTITY(1,1) NOT NULL,
	[idCurso] [int] NOT NULL,
	[idCicloEscolar] [int] NOT NULL,
	[CUIalumno] [nvarchar](30) NOT NULL,
	[notaObtenida] [numeric](18, 0) NOT NULL,
	[idSeccion] [int] NOT NULL,
	[CUIcolaborador] [nvarchar](30) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[idNotaFinal] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[pagos]    Script Date: 6/11/2024 11:55:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[pagos](
	[idPago] [int] IDENTITY(1,1) NOT NULL,
	[fechaPago] [datetime] NOT NULL,
	[montoPago] [decimal](18, 0) NOT NULL,
	[nombreCuentaOrigen] [nvarchar](255) NULL,
	[relacionInscrito] [nvarchar](100) NULL,
	[nit] [nvarchar](15) NULL,
	[nombreNit] [nvarchar](255) NULL,
	[direccionNit] [nvarchar](300) NULL,
	[numeroAutorizacion] [nvarchar](100) NULL,
	[imgTransferencia] [nvarchar](2024) NULL,
	[idSistemaPago] [int] NOT NULL,
	[estado] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[idPago] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[personas]    Script Date: 6/11/2024 11:55:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[personas](
	[CUI] [nvarchar](30) NOT NULL,
	[primerNombre] [nvarchar](100) NOT NULL,
	[segundoNombre] [nvarchar](300) NULL,
	[primerApellido] [nvarchar](100) NOT NULL,
	[segundoApellido] [nvarchar](300) NULL,
	[fechaDeNacimiento] [date] NOT NULL,
	[correo] [nvarchar](255) NOT NULL,
	[telefono] [nvarchar](15) NULL,
	[genero] [char](1) NOT NULL,
	[idRol] [int] NULL,
	[contrasenia] [nvarchar](2024) NULL,
	[requiereCambio] [char](1) NULL,
	[codigoPersonal] [nvarchar](30) NULL,
	[estado] [char](1) NULL,
	[direccion] [nvarchar](300) NULL,
PRIMARY KEY CLUSTERED 
(
	[CUI] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[respuestaAsignacionDinamica]    Script Date: 6/11/2024 11:55:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[respuestaAsignacionDinamica](
	[idRespuestaAsignacionDinamica] [int] IDENTITY(1,1) NOT NULL,
	[idAsignacionDinamica] [int] NULL,
	[idNota] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[idRespuestaAsignacionDinamica] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[respuestaEscalaDeRango]    Script Date: 6/11/2024 11:55:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[respuestaEscalaDeRango](
	[idRespuestaEscalaDeRango] [int] IDENTITY(1,1) NOT NULL,
	[idDescripcionEscalaDeRango] [int] NOT NULL,
	[idEscalaDeRango] [int] NOT NULL,
	[idTipoEscala] [int] NOT NULL,
	[idNota] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[idRespuestaEscalaDeRango] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[respuestaListaDeCotejo]    Script Date: 6/11/2024 11:55:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[respuestaListaDeCotejo](
	[idRespuestaListaDeCotejo] [int] IDENTITY(1,1) NOT NULL,
	[idListaDeCotejo] [int] NOT NULL,
	[idDescripcionListaDeCotejo] [int] NOT NULL,
	[resultadoVerdadero] [char](1) NULL,
	[resultadoFalso] [char](1) NULL,
	[idNota] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[idRespuestaListaDeCotejo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[respuestaRubrica]    Script Date: 6/11/2024 11:55:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[respuestaRubrica](
	[idRespuestaRubrica] [int] IDENTITY(1,1) NOT NULL,
	[idRubrica] [int] NOT NULL,
	[idDescripcionRubrica] [int] NOT NULL,
	[notaDebeMejorar] [decimal](18, 0) NULL,
	[notaSuficiente] [decimal](18, 0) NULL,
	[notaRegular] [decimal](18, 0) NULL,
	[notaBueno] [decimal](18, 0) NULL,
	[notaExelente] [decimal](18, 0) NULL,
	[dimension] [int] NULL,
	[idNota] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[idRespuestaRubrica] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[roles]    Script Date: 6/11/2024 11:55:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[roles](
	[idRol] [int] IDENTITY(1,1) NOT NULL,
	[descripcionDeRol] [nvarchar](500) NULL,
	[accesos] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[idRol] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[rubrica]    Script Date: 6/11/2024 11:55:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[rubrica](
	[idRubrica] [int] IDENTITY(1,1) NOT NULL,
	[idTarea] [int] NULL,
	[puntaje] [decimal](18, 0) NULL,
PRIMARY KEY CLUSTERED 
(
	[idRubrica] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[secciones]    Script Date: 6/11/2024 11:55:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[secciones](
	[idSeccion] [int] IDENTITY(1,1) NOT NULL,
	[idCurso] [int] NOT NULL,
	[idHorario] [int] NOT NULL,
	[estado] [char](1) NULL,
	[descripcion] [nvarchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[idSeccion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SistemaDePago]    Script Date: 6/11/2024 11:55:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SistemaDePago](
	[idSistemaPago] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [nvarchar](100) NOT NULL,
	[DESCRIPCION] [nvarchar](300) NULL,
	[estado] [char](1) NULL,
PRIMARY KEY CLUSTERED 
(
	[idSistemaPago] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tareas]    Script Date: 6/11/2024 11:55:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tareas](
	[idTarea] [int] IDENTITY(1,1) NOT NULL,
	[nombreTarea] [nvarchar](100) NOT NULL,
	[descripcionTarea] [nvarchar](max) NULL,
	[cuiUsuarioCrea] [nvarchar](30) NOT NULL,
	[fechaCreacion] [datetime] NOT NULL,
	[fechaVence] [datetime] NOT NULL,
	[estado] [char](1) NULL,
	[idTipoTarea] [int] NOT NULL,
	[idTipoCalificacion] [int] NOT NULL,
	[idFormatoCalificacion] [int] NOT NULL,
	[puntaje] [numeric](18, 0) NOT NULL,
	[idCurso] [int] NOT NULL,
	[idSeccion] [int] NOT NULL,
	[idHorario] [int] NULL,
	[bloqueoEntrega] [char](1) NULL,
	[idArhivosAdjuntos] [nvarchar](40) NULL,
PRIMARY KEY CLUSTERED 
(
	[idTarea] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tareasEntregadas]    Script Date: 6/11/2024 11:55:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tareasEntregadas](
	[idTareaEntregada] [int] IDENTITY(1,1) NOT NULL,
	[idTarea] [int] NOT NULL,
	[CUIalumno] [nvarchar](30) NOT NULL,
	[fechaDeEntrega] [datetime] NULL,
	[estado] [char](1) NULL,
	[idArchivosAdjuntos] [nvarchar](15) NOT NULL,
	[comentario] [nvarchar](1000) NULL,
	[idSeccion] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[idTareaEntregada] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tipocalificacion]    Script Date: 6/11/2024 11:55:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tipocalificacion](
	[idTipoCalificacion] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [nvarchar](255) NOT NULL,
	[estado] [char](1) NULL,
PRIMARY KEY CLUSTERED 
(
	[idTipoCalificacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tipoDocumento]    Script Date: 6/11/2024 11:55:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tipoDocumento](
	[idTipoDoc] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [nvarchar](100) NULL,
	[estado] [char](1) NULL,
PRIMARY KEY CLUSTERED 
(
	[idTipoDoc] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tipoEscala]    Script Date: 6/11/2024 11:55:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tipoEscala](
	[ididTipoEscala] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [nvarchar](255) NULL,
	[estado] [char](1) NULL,
PRIMARY KEY CLUSTERED 
(
	[ididTipoEscala] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tipoTarea]    Script Date: 6/11/2024 11:55:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tipoTarea](
	[idTipoTarea] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [nvarchar](255) NOT NULL,
	[estado] [char](1) NULL,
PRIMARY KEY CLUSTERED 
(
	[idTipoTarea] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[vocabulario]    Script Date: 6/11/2024 11:55:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[vocabulario](
	[idVocabulario] [int] IDENTITY(1,1) NOT NULL,
	[estado] [char](1) NULL,
	[idCurso] [int] NOT NULL,
	[idHorario] [int] NOT NULL,
	[idSeccion] [int] NOT NULL,
	[cuiUsuarioCrea] [nvarchar](30) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[idVocabulario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[alumnos] ON 
GO
INSERT [dbo].[alumnos] ([idAlumno], [cui], [idHorario], [residenteLocal], [idTipoDoc], [idGrupoEtnico], [discapacidad], [idDiscapacidad], [esColaborador], [areaDeTrabajo], [imgDPI], [idSistemaPago], [idPago], [idCurso], [idCicloEscolar], [estado]) VALUES (5, N'123', 2, N'S', 1, 1, N'S', 1, N'N', N'', N'https://archivos-sigered.s3.us-east-2.amazonaws.com/1729551262943-Actividad #1 PROCESO DE QA.pdf', 3, 12, 5, 2, 1)
GO
INSERT [dbo].[alumnos] ([idAlumno], [cui], [idHorario], [residenteLocal], [idTipoDoc], [idGrupoEtnico], [discapacidad], [idDiscapacidad], [esColaborador], [areaDeTrabajo], [imgDPI], [idSistemaPago], [idPago], [idCurso], [idCicloEscolar], [estado]) VALUES (6, N'223', 4, N'S', 1, 1, N'S', 1, N'N', N'', N'https://archivos-sigered.s3.us-east-2.amazonaws.com/1729559425179-PF Aseguramiento.pdf', 2, 13, 5, 2, 1)
GO
INSERT [dbo].[alumnos] ([idAlumno], [cui], [idHorario], [residenteLocal], [idTipoDoc], [idGrupoEtnico], [discapacidad], [idDiscapacidad], [esColaborador], [areaDeTrabajo], [imgDPI], [idSistemaPago], [idPago], [idCurso], [idCicloEscolar], [estado]) VALUES (8, N'34433', 1, N'S', 2, 2, N'S', 1, N'N', N'', N'https://archivos-sigered.s3.us-east-2.amazonaws.com/1729562305088-formato (1).pdf', 2, 15, 4, 2, 1)
GO
INSERT [dbo].[alumnos] ([idAlumno], [cui], [idHorario], [residenteLocal], [idTipoDoc], [idGrupoEtnico], [discapacidad], [idDiscapacidad], [esColaborador], [areaDeTrabajo], [imgDPI], [idSistemaPago], [idPago], [idCurso], [idCicloEscolar], [estado]) VALUES (9, N'66', 1, N'S', 1, 1, N'N', 1, N'N', N'', N'https://archivos-sigered.s3.us-east-2.amazonaws.com/1729563388113-formato (1).pdf', 2, 16, 4, 2, 0)
GO
INSERT [dbo].[alumnos] ([idAlumno], [cui], [idHorario], [residenteLocal], [idTipoDoc], [idGrupoEtnico], [discapacidad], [idDiscapacidad], [esColaborador], [areaDeTrabajo], [imgDPI], [idSistemaPago], [idPago], [idCurso], [idCicloEscolar], [estado]) VALUES (10, N'2', 1, N'S', 2, 1, N'N', 2, N'N', N'', N'https://archivos-sigered.s3.us-east-2.amazonaws.com/1729565301814-Actividad #1 PROCESO DE QA.pdf', 2, 17, 4, 2, 1)
GO
INSERT [dbo].[alumnos] ([idAlumno], [cui], [idHorario], [residenteLocal], [idTipoDoc], [idGrupoEtnico], [discapacidad], [idDiscapacidad], [esColaborador], [areaDeTrabajo], [imgDPI], [idSistemaPago], [idPago], [idCurso], [idCicloEscolar], [estado]) VALUES (11, N'2234', 1, N'S', 2, 1, N'N', 2, N'N', N'', N'https://archivos-sigered.s3.us-east-2.amazonaws.com/1729565639121-Actividad #1 PROCESO DE QA.pdf', 2, 18, 4, 2, 1)
GO
INSERT [dbo].[alumnos] ([idAlumno], [cui], [idHorario], [residenteLocal], [idTipoDoc], [idGrupoEtnico], [discapacidad], [idDiscapacidad], [esColaborador], [areaDeTrabajo], [imgDPI], [idSistemaPago], [idPago], [idCurso], [idCicloEscolar], [estado]) VALUES (12, N'67875675674', 1, N'S', 1, 1, N'N', 1, N'N', N'', N'https://archivos-sigered.s3.us-east-2.amazonaws.com/1729922390690-Actividad #1 PROCESO DE QA.pdf', 2, 19, 4, 2, 0)
GO
INSERT [dbo].[alumnos] ([idAlumno], [cui], [idHorario], [residenteLocal], [idTipoDoc], [idGrupoEtnico], [discapacidad], [idDiscapacidad], [esColaborador], [areaDeTrabajo], [imgDPI], [idSistemaPago], [idPago], [idCurso], [idCicloEscolar], [estado]) VALUES (13, N'1748663720101', 2, N'S', 1, 1, N'N', 1, N'N', N'', N'https://archivos-sigered.s3.us-east-2.amazonaws.com/1730488584070-FCarnet.jpg', 2, 20, 5, 2, 1)
GO
INSERT [dbo].[alumnos] ([idAlumno], [cui], [idHorario], [residenteLocal], [idTipoDoc], [idGrupoEtnico], [discapacidad], [idDiscapacidad], [esColaborador], [areaDeTrabajo], [imgDPI], [idSistemaPago], [idPago], [idCurso], [idCicloEscolar], [estado]) VALUES (14, N'4564666555666', 1, N'S', 1, 1, N'N', 1, N'N', N'', N'https://archivos-sigered.s3.us-east-2.amazonaws.com/1730570446331-sgrd.png', 2, 21, 4, 2, 1)
GO
INSERT [dbo].[alumnos] ([idAlumno], [cui], [idHorario], [residenteLocal], [idTipoDoc], [idGrupoEtnico], [discapacidad], [idDiscapacidad], [esColaborador], [areaDeTrabajo], [imgDPI], [idSistemaPago], [idPago], [idCurso], [idCicloEscolar], [estado]) VALUES (15, N'919199', 2, N'S', 1, 1, N'N', 1, N'N', N'', N'https://archivos-sigered.s3.us-east-2.amazonaws.com/1730875239086-Fondo.png', 1, 22, 5, 2, 1)
GO
SET IDENTITY_INSERT [dbo].[alumnos] OFF
GO
SET IDENTITY_INSERT [dbo].[asignacionDeCursos] ON 
GO
INSERT [dbo].[asignacionDeCursos] ([idAsignacion], [cui], [idCurso], [idRol], [idHorario], [idSeccion], [idCicloEscolar], [estado]) VALUES (62, N'1748663720101', 5, 3, 2, 7, 2, N'A')
GO
INSERT [dbo].[asignacionDeCursos] ([idAsignacion], [cui], [idCurso], [idRol], [idHorario], [idSeccion], [idCicloEscolar], [estado]) VALUES (63, N'223', 5, 3, 4, 3, 2, N'A')
GO
INSERT [dbo].[asignacionDeCursos] ([idAsignacion], [cui], [idCurso], [idRol], [idHorario], [idSeccion], [idCicloEscolar], [estado]) VALUES (64, N'34433', 4, 3, 1, 4, 2, N'A')
GO
INSERT [dbo].[asignacionDeCursos] ([idAsignacion], [cui], [idCurso], [idRol], [idHorario], [idSeccion], [idCicloEscolar], [estado]) VALUES (65, N'2', 4, 3, 1, 4, 2, N'A')
GO
INSERT [dbo].[asignacionDeCursos] ([idAsignacion], [cui], [idCurso], [idRol], [idHorario], [idSeccion], [idCicloEscolar], [estado]) VALUES (66, N'2234', 4, 3, 1, 4, 2, N'A')
GO
INSERT [dbo].[asignacionDeCursos] ([idAsignacion], [cui], [idCurso], [idRol], [idHorario], [idSeccion], [idCicloEscolar], [estado]) VALUES (67, N'4564666555666', 4, 3, 1, 6, 2, N'A')
GO
INSERT [dbo].[asignacionDeCursos] ([idAsignacion], [cui], [idCurso], [idRol], [idHorario], [idSeccion], [idCicloEscolar], [estado]) VALUES (68, N'919199', 5, 3, 2, 7, 2, N'A')
GO
INSERT [dbo].[asignacionDeCursos] ([idAsignacion], [cui], [idCurso], [idRol], [idHorario], [idSeccion], [idCicloEscolar], [estado]) VALUES (69, N'123', 5, 2, 2, 7, 2, N'A')
GO
INSERT [dbo].[asignacionDeCursos] ([idAsignacion], [cui], [idCurso], [idRol], [idHorario], [idSeccion], [idCicloEscolar], [estado]) VALUES (70, N'123', 4, 2, 1, 6, 2, N'A')
GO
INSERT [dbo].[asignacionDeCursos] ([idAsignacion], [cui], [idCurso], [idRol], [idHorario], [idSeccion], [idCicloEscolar], [estado]) VALUES (71, N'123111', 5, 2, 4, 3, 2, N'A')
GO
SET IDENTITY_INSERT [dbo].[asignacionDeCursos] OFF
GO
SET IDENTITY_INSERT [dbo].[cicloEscolar] ON 
GO
INSERT [dbo].[cicloEscolar] ([idCicloEscolar], [descripcion], [fecharInicio], [fechaFin], [anio], [estado]) VALUES (1, N'Ciclo de prueba', CAST(N'2024-01-22' AS Date), CAST(N'2024-11-22' AS Date), 2024, N'1')
GO
INSERT [dbo].[cicloEscolar] ([idCicloEscolar], [descripcion], [fecharInicio], [fechaFin], [anio], [estado]) VALUES (2, N'Ciclo de prueba 2', CAST(N'2024-09-27' AS Date), CAST(N'2024-10-07' AS Date), 2024, N'A')
GO
SET IDENTITY_INSERT [dbo].[cicloEscolar] OFF
GO
SET IDENTITY_INSERT [dbo].[cursos] ON 
GO
INSERT [dbo].[cursos] ([idCurso], [nombreCurso], [descripcionCurso], [estado], [idNivel]) VALUES (4, N'Basico', N'Normal', N'A', 1)
GO
INSERT [dbo].[cursos] ([idCurso], [nombreCurso], [descripcionCurso], [estado], [idNivel]) VALUES (5, N'Basico Verano', N'Curso de Verano', N'A', 1)
GO
INSERT [dbo].[cursos] ([idCurso], [nombreCurso], [descripcionCurso], [estado], [idNivel]) VALUES (7, N'Intermedio', N'Intermedio Luens a viernes', N'A', 1)
GO
SET IDENTITY_INSERT [dbo].[cursos] OFF
GO
SET IDENTITY_INSERT [dbo].[cursosDisponibles] ON 
GO
INSERT [dbo].[cursosDisponibles] ([idCursoDispobible], [idCurso], [requisito], [fechaInicio], [estado]) VALUES (1, 4, 3, CAST(N'2024-09-30' AS Date), N'I')
GO
INSERT [dbo].[cursosDisponibles] ([idCursoDispobible], [idCurso], [requisito], [fechaInicio], [estado]) VALUES (2, 4, 1, CAST(N'2024-10-11' AS Date), N'A')
GO
INSERT [dbo].[cursosDisponibles] ([idCursoDispobible], [idCurso], [requisito], [fechaInicio], [estado]) VALUES (3, 5, 1, CAST(N'2024-10-15' AS Date), N'A')
GO
INSERT [dbo].[cursosDisponibles] ([idCursoDispobible], [idCurso], [requisito], [fechaInicio], [estado]) VALUES (4, 5, 0, CAST(N'2024-10-15' AS Date), N'A')
GO
INSERT [dbo].[cursosDisponibles] ([idCursoDispobible], [idCurso], [requisito], [fechaInicio], [estado]) VALUES (5, 4, 0, CAST(N'2024-10-15' AS Date), N'A')
GO
SET IDENTITY_INSERT [dbo].[cursosDisponibles] OFF
GO
SET IDENTITY_INSERT [dbo].[discapacidades] ON 
GO
INSERT [dbo].[discapacidades] ([idDiscapacidad], [nombre], [descripcion], [estado]) VALUES (1, N'Ninguna', N'', N'A')
GO
INSERT [dbo].[discapacidades] ([idDiscapacidad], [nombre], [descripcion], [estado]) VALUES (2, N'Ceguera ', N'', N'A')
GO
INSERT [dbo].[discapacidades] ([idDiscapacidad], [nombre], [descripcion], [estado]) VALUES (3, N'Auditiva', N'', N'A')
GO
SET IDENTITY_INSERT [dbo].[discapacidades] OFF
GO
SET IDENTITY_INSERT [dbo].[grupoEtnico] ON 
GO
INSERT [dbo].[grupoEtnico] ([idGrupo], [nombreGrupo], [Descripcion], [estado]) VALUES (1, N'Ladino/Meztizo', N'', N'A')
GO
INSERT [dbo].[grupoEtnico] ([idGrupo], [nombreGrupo], [Descripcion], [estado]) VALUES (2, N'Maya', N'', N'A')
GO
SET IDENTITY_INSERT [dbo].[grupoEtnico] OFF
GO
SET IDENTITY_INSERT [dbo].[horarios] ON 
GO
INSERT [dbo].[horarios] ([idHorario], [horario], [descripcion], [estado], [idCurso]) VALUES (1, N'10-11 ', N'Hora matuttino de verano', N'A', 4)
GO
INSERT [dbo].[horarios] ([idHorario], [horario], [descripcion], [estado], [idCurso]) VALUES (2, N'10-11 am', N'', N'A', 5)
GO
INSERT [dbo].[horarios] ([idHorario], [horario], [descripcion], [estado], [idCurso]) VALUES (3, N'12- 14 pm', N'', N'A', 4)
GO
INSERT [dbo].[horarios] ([idHorario], [horario], [descripcion], [estado], [idCurso]) VALUES (4, N'15-17 pm', N'Registor de Prueba', N'A', 5)
GO
SET IDENTITY_INSERT [dbo].[horarios] OFF
GO
INSERT [dbo].[niveles] ([idNivel], [nombreNivel], [estado]) VALUES (1, N'Basico 1', N'A')
GO
INSERT [dbo].[niveles] ([idNivel], [nombreNivel], [estado]) VALUES (2, N'Basico 2 Prueba', N'I')
GO
INSERT [dbo].[niveles] ([idNivel], [nombreNivel], [estado]) VALUES (3, N'Intermedio 2', N'A')
GO
SET IDENTITY_INSERT [dbo].[pagos] ON 
GO
INSERT [dbo].[pagos] ([idPago], [fechaPago], [montoPago], [nombreCuentaOrigen], [relacionInscrito], [nit], [nombreNit], [direccionNit], [numeroAutorizacion], [imgTransferencia], [idSistemaPago], [estado]) VALUES (1, CAST(N'2024-10-18T00:00:00.000' AS DateTime), CAST(345453 AS Decimal(18, 0)), N'', N'', N'', N'', N'', N'123332', N'https://archivos-sigered.s3.us-east-2.amazonaws.com/1729205107423-Carta de renuncia1.pdf', 3, 1)
GO
INSERT [dbo].[pagos] ([idPago], [fechaPago], [montoPago], [nombreCuentaOrigen], [relacionInscrito], [nit], [nombreNit], [direccionNit], [numeroAutorizacion], [imgTransferencia], [idSistemaPago], [estado]) VALUES (2, CAST(N'2024-10-22T00:00:00.000' AS DateTime), CAST(344 AS Decimal(18, 0)), N'perro', N'', N'', N'', N'', N'1233322', N'https://archivos-sigered.s3.us-east-2.amazonaws.com/1729455681165-error defeto y falla.pdf', 2, 1)
GO
INSERT [dbo].[pagos] ([idPago], [fechaPago], [montoPago], [nombreCuentaOrigen], [relacionInscrito], [nit], [nombreNit], [direccionNit], [numeroAutorizacion], [imgTransferencia], [idSistemaPago], [estado]) VALUES (3, CAST(N'2024-10-24T00:00:00.000' AS DateTime), CAST(34 AS Decimal(18, 0)), N'perro', N'padre', N'', N'perro mayor', N'cf', N'1233325', N'https://archivos-sigered.s3.us-east-2.amazonaws.com/1729456660480-formato (1).pdf', 2, 1)
GO
INSERT [dbo].[pagos] ([idPago], [fechaPago], [montoPago], [nombreCuentaOrigen], [relacionInscrito], [nit], [nombreNit], [direccionNit], [numeroAutorizacion], [imgTransferencia], [idSistemaPago], [estado]) VALUES (12, CAST(N'2024-10-22T00:00:00.000' AS DateTime), CAST(12 AS Decimal(18, 0)), N'perro', N'padre', N'99314959', N'perro mayor', N'cf', N'12333212', N'https://archivos-sigered.s3.us-east-2.amazonaws.com/1729551260807-error defeto y falla.pdf', 3, 1)
GO
INSERT [dbo].[pagos] ([idPago], [fechaPago], [montoPago], [nombreCuentaOrigen], [relacionInscrito], [nit], [nombreNit], [direccionNit], [numeroAutorizacion], [imgTransferencia], [idSistemaPago], [estado]) VALUES (13, CAST(N'2024-10-21T00:00:00.000' AS DateTime), CAST(300 AS Decimal(18, 0)), N'', N'', N'', N'', N'cf', N'1', N'https://archivos-sigered.s3.us-east-2.amazonaws.com/1729559416611-formato (1).pdf', 2, 1)
GO
INSERT [dbo].[pagos] ([idPago], [fechaPago], [montoPago], [nombreCuentaOrigen], [relacionInscrito], [nit], [nombreNit], [direccionNit], [numeroAutorizacion], [imgTransferencia], [idSistemaPago], [estado]) VALUES (15, CAST(N'2024-11-11T00:00:00.000' AS DateTime), CAST(23 AS Decimal(18, 0)), N'perro', N'padre', N'99314959', N'perro mayor', N'cf', N'123332456', N'https://archivos-sigered.s3.us-east-2.amazonaws.com/1729562302969-Actividad #1 PROCESO DE QA.pdf', 2, 1)
GO
INSERT [dbo].[pagos] ([idPago], [fechaPago], [montoPago], [nombreCuentaOrigen], [relacionInscrito], [nit], [nombreNit], [direccionNit], [numeroAutorizacion], [imgTransferencia], [idSistemaPago], [estado]) VALUES (16, CAST(N'2022-11-11T00:00:00.000' AS DateTime), CAST(12 AS Decimal(18, 0)), N'', N'padre', N'99314959', N'', N'cf', N'122', N'https://archivos-sigered.s3.us-east-2.amazonaws.com/1729563386104-error defeto y falla.pdf', 2, 0)
GO
INSERT [dbo].[pagos] ([idPago], [fechaPago], [montoPago], [nombreCuentaOrigen], [relacionInscrito], [nit], [nombreNit], [direccionNit], [numeroAutorizacion], [imgTransferencia], [idSistemaPago], [estado]) VALUES (17, CAST(N'2024-10-29T00:00:00.000' AS DateTime), CAST(4 AS Decimal(18, 0)), N'perro', N'padre', N'99314959', N'perro mayor', N'cf', N'45', N'https://archivos-sigered.s3.us-east-2.amazonaws.com/1729565300675-formato (1).pdf', 2, 1)
GO
INSERT [dbo].[pagos] ([idPago], [fechaPago], [montoPago], [nombreCuentaOrigen], [relacionInscrito], [nit], [nombreNit], [direccionNit], [numeroAutorizacion], [imgTransferencia], [idSistemaPago], [estado]) VALUES (18, CAST(N'2024-10-29T00:00:00.000' AS DateTime), CAST(4 AS Decimal(18, 0)), N'perro', N'padre', N'99314959', N'perro mayor', N'cf', N'455', N'https://archivos-sigered.s3.us-east-2.amazonaws.com/1729565638213-formato (1).pdf', 2, 1)
GO
INSERT [dbo].[pagos] ([idPago], [fechaPago], [montoPago], [nombreCuentaOrigen], [relacionInscrito], [nit], [nombreNit], [direccionNit], [numeroAutorizacion], [imgTransferencia], [idSistemaPago], [estado]) VALUES (19, CAST(N'2024-10-16T00:00:00.000' AS DateTime), CAST(100 AS Decimal(18, 0)), N'Antony', N'Persona', N'99314959', N'Antony ralon', N'cf', N'12333255', N'https://archivos-sigered.s3.us-east-2.amazonaws.com/1729922389789-PF Aseguramiento.pdf', 2, 0)
GO
INSERT [dbo].[pagos] ([idPago], [fechaPago], [montoPago], [nombreCuentaOrigen], [relacionInscrito], [nit], [nombreNit], [direccionNit], [numeroAutorizacion], [imgTransferencia], [idSistemaPago], [estado]) VALUES (20, CAST(N'2024-10-29T00:00:00.000' AS DateTime), CAST(125 AS Decimal(18, 0)), N'', N'padre', N'', N'50692399', N'', N'34', N'https://archivos-sigered.s3.us-east-2.amazonaws.com/1730488581634-FCarnet.jpg', 2, 1)
GO
INSERT [dbo].[pagos] ([idPago], [fechaPago], [montoPago], [nombreCuentaOrigen], [relacionInscrito], [nit], [nombreNit], [direccionNit], [numeroAutorizacion], [imgTransferencia], [idSistemaPago], [estado]) VALUES (21, CAST(N'2024-11-14T00:00:00.000' AS DateTime), CAST(100 AS Decimal(18, 0)), N'Antony', N'Padre', N'9930313', N'', N'', N'4545456', N'https://archivos-sigered.s3.us-east-2.amazonaws.com/1730570445267-logo.png', 2, 1)
GO
INSERT [dbo].[pagos] ([idPago], [fechaPago], [montoPago], [nombreCuentaOrigen], [relacionInscrito], [nit], [nombreNit], [direccionNit], [numeroAutorizacion], [imgTransferencia], [idSistemaPago], [estado]) VALUES (22, CAST(N'2024-11-07T00:00:00.000' AS DateTime), CAST(150 AS Decimal(18, 0)), N'', N'', N'99314959', N'Antonio', N'', N'12345678', N'https://archivos-sigered.s3.us-east-2.amazonaws.com/1730875236710-marianogalvez22.png', 1, 1)
GO
SET IDENTITY_INSERT [dbo].[pagos] OFF
GO
INSERT [dbo].[personas] ([CUI], [primerNombre], [segundoNombre], [primerApellido], [segundoApellido], [fechaDeNacimiento], [correo], [telefono], [genero], [idRol], [contrasenia], [requiereCambio], [codigoPersonal], [estado], [direccion]) VALUES (N'123', N'ADMIN', N'', N'ADMIN', N'', CAST(N'1999-10-22' AS Date), N'ADMIN', N'123', N'M', 1, N'$2a$10$OVPIzIcVL4e9sFnYw61tAeoebYUEJFdq0NePikcTfB2npGUytVpU2', N'0', N'123', N'A', N'CF')
GO
INSERT [dbo].[personas] ([CUI], [primerNombre], [segundoNombre], [primerApellido], [segundoApellido], [fechaDeNacimiento], [correo], [telefono], [genero], [idRol], [contrasenia], [requiereCambio], [codigoPersonal], [estado], [direccion]) VALUES (N'123111', N'Antony', N'Alessandro', N'Ralon', N'Valenzuea', CAST(N'2024-10-21' AS Date), N'ju@example.com', N'55100991', N'M', 1, N'$2a$10$GHmocf1s5GJSwKNQ3yYHbOq8SE10VXtIrvGvlJh.rOFtXwu9z5fo2', N'1', N'07010', N'A', N'Final Calle del Rasto')
GO
INSERT [dbo].[personas] ([CUI], [primerNombre], [segundoNombre], [primerApellido], [segundoApellido], [fechaDeNacimiento], [correo], [telefono], [genero], [idRol], [contrasenia], [requiereCambio], [codigoPersonal], [estado], [direccion]) VALUES (N'123123132', N'Adonis', N'Abimael ', N'Rodriguez', N'Juarez', CAST(N'2000-11-11' AS Date), N'DONI@D', N'123', N'M', 1, N'123', N'1', N'123', N'A', N'FF')
GO
INSERT [dbo].[personas] ([CUI], [primerNombre], [segundoNombre], [primerApellido], [segundoApellido], [fechaDeNacimiento], [correo], [telefono], [genero], [idRol], [contrasenia], [requiereCambio], [codigoPersonal], [estado], [direccion]) VALUES (N'1233', N'Henrry', N'', N'Rodriguez ', N'Isai', CAST(N'2024-09-17' AS Date), N'e@e', N'1231231', N'M', 1, N'$2a$10$5c3qALZt7UOt8dPIt7jEu.4dKjSBC30AICCM4Zm6z6XlXtzG.n2tO', N'1', N'123213', N'A', N'')
GO
INSERT [dbo].[personas] ([CUI], [primerNombre], [segundoNombre], [primerApellido], [segundoApellido], [fechaDeNacimiento], [correo], [telefono], [genero], [idRol], [contrasenia], [requiereCambio], [codigoPersonal], [estado], [direccion]) VALUES (N'1234567890123', N'Juan', N'', N'Perez', N'Lopez', CAST(N'1990-01-01' AS Date), N'juan@example.com', N'5551234567', N'M', 1, N'mi_contraseña_segura', N'1', N'COD123', N'I', N'123 Calle Falsa')
GO
INSERT [dbo].[personas] ([CUI], [primerNombre], [segundoNombre], [primerApellido], [segundoApellido], [fechaDeNacimiento], [correo], [telefono], [genero], [idRol], [contrasenia], [requiereCambio], [codigoPersonal], [estado], [direccion]) VALUES (N'1748663720101', N'Ingrid ', N'Petronila ', N'Valenzuela', N'Batz ', CAST(N'1978-05-15' AS Date), N'alessandroralon@gmail.comm', N'55100991', N'F', 3, N'$2a$10$gV3yv75ShlfFgjGvMf5SV.YldPy4.4b6trJ2xFP.ZVP9fHBEaY/Wm', N'1', N'', N'A', N'Final Calle del Rasto')
GO
INSERT [dbo].[personas] ([CUI], [primerNombre], [segundoNombre], [primerApellido], [segundoApellido], [fechaDeNacimiento], [correo], [telefono], [genero], [idRol], [contrasenia], [requiereCambio], [codigoPersonal], [estado], [direccion]) VALUES (N'2', N'Henrry', N'Antony', N'RodriguezJ', N'Ralon', CAST(N'2024-10-02' AS Date), N'alessandroralon@gmail.comm', N'55100991', N'M', 3, N'$2a$10$13rIYk6cTnb4ICeKpvih.ufutFdHJ4Fj.f8fO8LVC7OTBb4PfBIFC', N'1', N'', N'A', N'Final Calle del Rasto')
GO
INSERT [dbo].[personas] ([CUI], [primerNombre], [segundoNombre], [primerApellido], [segundoApellido], [fechaDeNacimiento], [correo], [telefono], [genero], [idRol], [contrasenia], [requiereCambio], [codigoPersonal], [estado], [direccion]) VALUES (N'22', N'Henrry', N'Antony', N'RodriguezJ', N'Ralon', CAST(N'2024-10-02' AS Date), N'alessandroralon@gmail.comm', N'55100991', N'M', 3, N'$2a$10$YniJTBF59X3JVLzs3MD.3.QZc9HbVH98NtMMKSuOm8u0e4IPk8kci', N'1', N'', N'R', N'Final Calle del Rasto')
GO
INSERT [dbo].[personas] ([CUI], [primerNombre], [segundoNombre], [primerApellido], [segundoApellido], [fechaDeNacimiento], [correo], [telefono], [genero], [idRol], [contrasenia], [requiereCambio], [codigoPersonal], [estado], [direccion]) VALUES (N'223', N'Prueba', N'completa', N'Iscriocion', N'cursos', CAST(N'2000-11-11' AS Date), N'alessandroralon@gmail.commn', N'55100991', N'M', 3, N'$2a$10$oStqGUSTF4LlbFUKjBXVVu0vTv3PTsKcgHKamiglB4X9ag3wZZG26', N'1', N'ttr', N'A', N'Final Calle del Rasto')
GO
INSERT [dbo].[personas] ([CUI], [primerNombre], [segundoNombre], [primerApellido], [segundoApellido], [fechaDeNacimiento], [correo], [telefono], [genero], [idRol], [contrasenia], [requiereCambio], [codigoPersonal], [estado], [direccion]) VALUES (N'2234', N'Henrry', N'Antony', N'RodriguezJ', N'Ralon', CAST(N'2024-10-02' AS Date), N'alessandroralon@gmail.coMm', N'55100991', N'M', 3, N'$2a$10$/5gNsin59.EXfhdPcAbhxOECqHJ2h2Clro2R9z3h2qDOH8Xa2opKm', N'1', N'', N'A', N'Final Calle del Rasto')
GO
INSERT [dbo].[personas] ([CUI], [primerNombre], [segundoNombre], [primerApellido], [segundoApellido], [fechaDeNacimiento], [correo], [telefono], [genero], [idRol], [contrasenia], [requiereCambio], [codigoPersonal], [estado], [direccion]) VALUES (N'2323', N'Jose', N'Fernando', N'yODA', N'Ralon', CAST(N'2024-10-17' AS Date), N'p@p', N'55100991', N'M', 2, N'$2a$10$hmN8acFTu0JtQeUdtHULEegBI5nKvOAP7iwpkjGWmQo7lWLTd05CC', N'1', N'07010', N'A', N'Final Calle del Rasto')
GO
INSERT [dbo].[personas] ([CUI], [primerNombre], [segundoNombre], [primerApellido], [segundoApellido], [fechaDeNacimiento], [correo], [telefono], [genero], [idRol], [contrasenia], [requiereCambio], [codigoPersonal], [estado], [direccion]) VALUES (N'31432233', N'antony', N'alessandro', N'Ralon', N'valenzueal', CAST(N'1999-10-22' AS Date), N'hola', N'123', N'm', 3, N'$2a$10$I22spGdx.GctKCbpL3M1RerdDfCIia6lCsR28CrYMG9fTSmpkU/vO', N'0', N'123', N'R', N'fcr')
GO
INSERT [dbo].[personas] ([CUI], [primerNombre], [segundoNombre], [primerApellido], [segundoApellido], [fechaDeNacimiento], [correo], [telefono], [genero], [idRol], [contrasenia], [requiereCambio], [codigoPersonal], [estado], [direccion]) VALUES (N'31432234', N'alessandro', N'', N'Ralon', N'valenzueal', CAST(N'1999-10-22' AS Date), N'ale', N'123', N'm', 2, N'$2a$10$OVPIzIcVL4e9sFnYw61tAeoebYUEJFdq0NePikcTfB2npGUytVpU2', N'0', N'123', N'1', N'fcr')
GO
INSERT [dbo].[personas] ([CUI], [primerNombre], [segundoNombre], [primerApellido], [segundoApellido], [fechaDeNacimiento], [correo], [telefono], [genero], [idRol], [contrasenia], [requiereCambio], [codigoPersonal], [estado], [direccion]) VALUES (N'3443', N'Henrry', N'Antony', N'RodriguezJ', N'Ralon', CAST(N'2000-11-11' AS Date), N'alessandroralon@gmail.comm', N'55100991', N'M', 3, N'$2a$10$EpVOzQ3wpokS1YQ9ieOe5uiF9EXIuX3AI1tajOfboBZHvftsKnchC', N'1', N'', N'R', N'Final Calle del Rasto')
GO
INSERT [dbo].[personas] ([CUI], [primerNombre], [segundoNombre], [primerApellido], [segundoApellido], [fechaDeNacimiento], [correo], [telefono], [genero], [idRol], [contrasenia], [requiereCambio], [codigoPersonal], [estado], [direccion]) VALUES (N'34433', N'Henrry', N'Antony', N'RodriguezJ', N'Ralon', CAST(N'2000-11-11' AS Date), N'alessandroralon@gmail.comm', N'55100991', N'M', 3, N'$2a$10$z9zqRzxppAiZ8j4myH76ROANIR8guTXPsk6WQMFD3UmMX34pmzpXe', N'1', N'', N'A', N'Final Calle del Rasto')
GO
INSERT [dbo].[personas] ([CUI], [primerNombre], [segundoNombre], [primerApellido], [segundoApellido], [fechaDeNacimiento], [correo], [telefono], [genero], [idRol], [contrasenia], [requiereCambio], [codigoPersonal], [estado], [direccion]) VALUES (N'443443', N'Jose', N'Mario', N'Lucas', N'Contreras', CAST(N'2000-12-12' AS Date), N'm@m', N'12312321', N'F', 1, N'$2a$10$Yd0W87LyL4Ugieuu6uZQGunap2Af016kTss5hYKVfpLTS2sGjjHNW', N'1', N'07010', N'I', N'Final Calle del Rasto')
GO
INSERT [dbo].[personas] ([CUI], [primerNombre], [segundoNombre], [primerApellido], [segundoApellido], [fechaDeNacimiento], [correo], [telefono], [genero], [idRol], [contrasenia], [requiereCambio], [codigoPersonal], [estado], [direccion]) VALUES (N'4564666555666', N'Antony', N'Alessadro', N'Ralon', N'Valenzuela', CAST(N'1999-10-22' AS Date), N'aralonv@miumg.edu.gt', N'5502222', N'M', 3, N'$2a$10$c.Xh43wqOYQxn1nye3N.MecNGSv//FKXd/RzRpLyqa7x0PtZtQcom', N'1', N'', N'A', N'Final Calle el Rasto')
GO
INSERT [dbo].[personas] ([CUI], [primerNombre], [segundoNombre], [primerApellido], [segundoApellido], [fechaDeNacimiento], [correo], [telefono], [genero], [idRol], [contrasenia], [requiereCambio], [codigoPersonal], [estado], [direccion]) VALUES (N'534543543', N'Henrry', N'Antony', N'Rodriguez ', N'Ralon', CAST(N'2024-09-16' AS Date), N'q@example.com', N'55100991', N'M', 1, N'$2a$10$N9x3n6SWHWikr.E8py7ahOds4SWSrX0Ikf.lgWtivxsBXz2TZYlZ.', N'1', N'07010', N'A', N'Final Calle del Rasto')
GO
INSERT [dbo].[personas] ([CUI], [primerNombre], [segundoNombre], [primerApellido], [segundoApellido], [fechaDeNacimiento], [correo], [telefono], [genero], [idRol], [contrasenia], [requiereCambio], [codigoPersonal], [estado], [direccion]) VALUES (N'66', N'Henrry', N'Antony', N'RodriguezJ', N'Ralon', CAST(N'2000-11-11' AS Date), N'alessandroralon@gmail.comm', N'55100991', N'M', 3, N'$2a$10$GE4ToEwMbEQBv4.C/5.hWONLG0uvfebFxTjmqsAbw/rP.KhH/n/n6', N'1', N'', N'R', N'Final Calle del Rasto')
GO
INSERT [dbo].[personas] ([CUI], [primerNombre], [segundoNombre], [primerApellido], [segundoApellido], [fechaDeNacimiento], [correo], [telefono], [genero], [idRol], [contrasenia], [requiereCambio], [codigoPersonal], [estado], [direccion]) VALUES (N'6787', N'Antony ', N'Alessandro', N'Ralon', N'VALENUZEA', CAST(N'1999-10-22' AS Date), N'alessandroralon@gmail.coMm', N'55100991', N'M', 3, N'$2a$10$V.Ou6hWbNrfYbhaOJi9O0u6olMsuyfPbw0G9cp/caaPH1.Pd64Kni', N'1', N'', N'R', N'Final Calle del Rasto')
GO
INSERT [dbo].[personas] ([CUI], [primerNombre], [segundoNombre], [primerApellido], [segundoApellido], [fechaDeNacimiento], [correo], [telefono], [genero], [idRol], [contrasenia], [requiereCambio], [codigoPersonal], [estado], [direccion]) VALUES (N'67875675674', N'Antony ', N'Alessandro', N'Ralon', N'VALENUZEA', CAST(N'1999-10-22' AS Date), N'alessandroralon@gmail.comm', N'55100991', N'M', 3, N'$2a$10$hXPe6yXifExXilulOR4HNeI4DmK9RVrKC7vE.skqTY1aPUjbAwOaS', N'1', N'', N'R', N'Final Calle del Rasto')
GO
INSERT [dbo].[personas] ([CUI], [primerNombre], [segundoNombre], [primerApellido], [segundoApellido], [fechaDeNacimiento], [correo], [telefono], [genero], [idRol], [contrasenia], [requiereCambio], [codigoPersonal], [estado], [direccion]) VALUES (N'919199', N'Heriberto', N'Antonio', N'Menendez', N'Ralon', CAST(N'1997-10-29' AS Date), N'alessandroralon@gmail.com', N'55100991', N'M', 3, N'$2a$10$UUYNCDgNdXRBJWsNHHPnbuxPmKCN1Lb3yOP30lcirIPgxYt7agtZe', N'0', N'', N'A', N'Final Calle del Rasto')
GO
INSERT [dbo].[personas] ([CUI], [primerNombre], [segundoNombre], [primerApellido], [segundoApellido], [fechaDeNacimiento], [correo], [telefono], [genero], [idRol], [contrasenia], [requiereCambio], [codigoPersonal], [estado], [direccion]) VALUES (N'99', N'Jose', N'Antony', N'RodriguezJ', N'Ralon', CAST(N'2024-11-08' AS Date), N'h@com', N'55100991', N'M', 2, N'$2a$10$OVPIzIcVL4e9sFnYw61tAeoebYUEJFdq0NePikcTfB2npGUytVpU2', N'1', N'07010', N'A', N'Final Calle del Rasto')
GO
SET IDENTITY_INSERT [dbo].[roles] ON 
GO
INSERT [dbo].[roles] ([idRol], [descripcionDeRol], [accesos]) VALUES (1, N'Admin', N'1')
GO
INSERT [dbo].[roles] ([idRol], [descripcionDeRol], [accesos]) VALUES (2, N'Docente', N'1')
GO
INSERT [dbo].[roles] ([idRol], [descripcionDeRol], [accesos]) VALUES (3, N'Alumno', N'1')
GO
SET IDENTITY_INSERT [dbo].[roles] OFF
GO
SET IDENTITY_INSERT [dbo].[secciones] ON 
GO
INSERT [dbo].[secciones] ([idSeccion], [idCurso], [idHorario], [estado], [descripcion]) VALUES (1, 4, 3, N'A', N'Sección A')
GO
INSERT [dbo].[secciones] ([idSeccion], [idCurso], [idHorario], [estado], [descripcion]) VALUES (2, 4, 3, N'A', N'Sección B')
GO
INSERT [dbo].[secciones] ([idSeccion], [idCurso], [idHorario], [estado], [descripcion]) VALUES (3, 5, 4, N'A', N'Seccion A')
GO
INSERT [dbo].[secciones] ([idSeccion], [idCurso], [idHorario], [estado], [descripcion]) VALUES (4, 4, 1, N'A', N'Seccion A')
GO
INSERT [dbo].[secciones] ([idSeccion], [idCurso], [idHorario], [estado], [descripcion]) VALUES (5, 5, 4, N'A', N'Seccion A')
GO
INSERT [dbo].[secciones] ([idSeccion], [idCurso], [idHorario], [estado], [descripcion]) VALUES (6, 4, 1, N'A', N'Seccion b')
GO
INSERT [dbo].[secciones] ([idSeccion], [idCurso], [idHorario], [estado], [descripcion]) VALUES (7, 5, 2, N'A', N'Sección A')
GO
SET IDENTITY_INSERT [dbo].[secciones] OFF
GO
SET IDENTITY_INSERT [dbo].[SistemaDePago] ON 
GO
INSERT [dbo].[SistemaDePago] ([idSistemaPago], [nombre], [DESCRIPCION], [estado]) VALUES (1, N'Pago con Tarjeta', N'', N'A')
GO
INSERT [dbo].[SistemaDePago] ([idSistemaPago], [nombre], [DESCRIPCION], [estado]) VALUES (2, N'Transferencia', N'', N'A')
GO
INSERT [dbo].[SistemaDePago] ([idSistemaPago], [nombre], [DESCRIPCION], [estado]) VALUES (3, N'Deposito', N'', N'A')
GO
SET IDENTITY_INSERT [dbo].[SistemaDePago] OFF
GO
SET IDENTITY_INSERT [dbo].[tareas] ON 
GO
INSERT [dbo].[tareas] ([idTarea], [nombreTarea], [descripcionTarea], [cuiUsuarioCrea], [fechaCreacion], [fechaVence], [estado], [idTipoTarea], [idTipoCalificacion], [idFormatoCalificacion], [puntaje], [idCurso], [idSeccion], [idHorario], [bloqueoEntrega], [idArhivosAdjuntos]) VALUES (2, N'primera tarea', N'sin archivos', N'123', CAST(N'2024-11-05T10:31:59.440' AS DateTime), CAST(N'2024-11-07T00:00:00.000' AS DateTime), N'A', 2, 4, 2, CAST(5 AS Numeric(18, 0)), 4, 4, 1, N'1', N'N/A')
GO
INSERT [dbo].[tareas] ([idTarea], [nombreTarea], [descripcionTarea], [cuiUsuarioCrea], [fechaCreacion], [fechaVence], [estado], [idTipoTarea], [idTipoCalificacion], [idFormatoCalificacion], [puntaje], [idCurso], [idSeccion], [idHorario], [bloqueoEntrega], [idArhivosAdjuntos]) VALUES (3, N'primera tarea', N'con adjuntos', N'123', CAST(N'2024-11-05T10:41:06.977' AS DateTime), CAST(N'2024-11-13T00:00:00.000' AS DateTime), N'A', 2, 4, 3, CAST(10 AS Numeric(18, 0)), 4, 4, 1, NULL, N'ae71573a-6a06-44f4-99ad-4d8557')
GO
INSERT [dbo].[tareas] ([idTarea], [nombreTarea], [descripcionTarea], [cuiUsuarioCrea], [fechaCreacion], [fechaVence], [estado], [idTipoTarea], [idTipoCalificacion], [idFormatoCalificacion], [puntaje], [idCurso], [idSeccion], [idHorario], [bloqueoEntrega], [idArhivosAdjuntos]) VALUES (4, N'tarea 2 ', N'preuasb 2', N'123', CAST(N'2024-11-05T13:40:22.077' AS DateTime), CAST(N'2024-11-05T00:00:00.000' AS DateTime), N'A', 2, 4, 4, CAST(10 AS Numeric(18, 0)), 5, 5, 4, NULL, N'N/A')
GO
INSERT [dbo].[tareas] ([idTarea], [nombreTarea], [descripcionTarea], [cuiUsuarioCrea], [fechaCreacion], [fechaVence], [estado], [idTipoTarea], [idTipoCalificacion], [idFormatoCalificacion], [puntaje], [idCurso], [idSeccion], [idHorario], [bloqueoEntrega], [idArhivosAdjuntos]) VALUES (5, N'Tarea de Pruebas', N'puresbas', N'123', CAST(N'2024-11-06T06:59:41.340' AS DateTime), CAST(N'2024-11-07T00:00:00.000' AS DateTime), N'A', 1, 4, 5, CAST(10 AS Numeric(18, 0)), 5, 7, 2, NULL, N'20926f1b-3f59-4409-b6bb-2a1575')
GO
INSERT [dbo].[tareas] ([idTarea], [nombreTarea], [descripcionTarea], [cuiUsuarioCrea], [fechaCreacion], [fechaVence], [estado], [idTipoTarea], [idTipoCalificacion], [idFormatoCalificacion], [puntaje], [idCurso], [idSeccion], [idHorario], [bloqueoEntrega], [idArhivosAdjuntos]) VALUES (6, N'Matriz de asignacion', N'Puereuba de tareas Cargadas ', N'123', CAST(N'2024-11-06T12:16:17.773' AS DateTime), CAST(N'2024-11-13T00:00:00.000' AS DateTime), N'A', 2, 4, 6, CAST(25 AS Numeric(18, 0)), 5, 7, 2, NULL, N'52971a22-2222-4e9d-93a0-2284b6')
GO
SET IDENTITY_INSERT [dbo].[tareas] OFF
GO
SET IDENTITY_INSERT [dbo].[tipocalificacion] ON 
GO
INSERT [dbo].[tipocalificacion] ([idTipoCalificacion], [descripcion], [estado]) VALUES (1, N'Rubrica', N'A')
GO
INSERT [dbo].[tipocalificacion] ([idTipoCalificacion], [descripcion], [estado]) VALUES (2, N'Lista de Cotejo', N'A')
GO
INSERT [dbo].[tipocalificacion] ([idTipoCalificacion], [descripcion], [estado]) VALUES (3, N'Escala de Rango', N'A')
GO
INSERT [dbo].[tipocalificacion] ([idTipoCalificacion], [descripcion], [estado]) VALUES (4, N'Nota Manual', N'A')
GO
SET IDENTITY_INSERT [dbo].[tipocalificacion] OFF
GO
SET IDENTITY_INSERT [dbo].[tipoDocumento] ON 
GO
INSERT [dbo].[tipoDocumento] ([idTipoDoc], [nombre], [estado]) VALUES (1, N'DPI / CUI', N'A')
GO
INSERT [dbo].[tipoDocumento] ([idTipoDoc], [nombre], [estado]) VALUES (2, N'Pasaporte', N'A')
GO
INSERT [dbo].[tipoDocumento] ([idTipoDoc], [nombre], [estado]) VALUES (3, N'Cedula', N'A')
GO
INSERT [dbo].[tipoDocumento] ([idTipoDoc], [nombre], [estado]) VALUES (4, N'Cedula de Vecindad', N'A')
GO
INSERT [dbo].[tipoDocumento] ([idTipoDoc], [nombre], [estado]) VALUES (5, N'Pasaporte 2', N'A')
GO
INSERT [dbo].[tipoDocumento] ([idTipoDoc], [nombre], [estado]) VALUES (6, N'alessandro', N'I')
GO
SET IDENTITY_INSERT [dbo].[tipoDocumento] OFF
GO
SET IDENTITY_INSERT [dbo].[tipoEscala] ON 
GO
INSERT [dbo].[tipoEscala] ([ididTipoEscala], [descripcion], [estado]) VALUES (1, N'Deficiente', N'A')
GO
INSERT [dbo].[tipoEscala] ([ididTipoEscala], [descripcion], [estado]) VALUES (2, N'Excelente ', N'A')
GO
INSERT [dbo].[tipoEscala] ([ididTipoEscala], [descripcion], [estado]) VALUES (3, N'Muy Bueno', N'A')
GO
SET IDENTITY_INSERT [dbo].[tipoEscala] OFF
GO
SET IDENTITY_INSERT [dbo].[tipoTarea] ON 
GO
INSERT [dbo].[tipoTarea] ([idTipoTarea], [descripcion], [estado]) VALUES (1, N'Asignacion Normal', N'A')
GO
INSERT [dbo].[tipoTarea] ([idTipoTarea], [descripcion], [estado]) VALUES (2, N'Asignacion ', N'A')
GO
SET IDENTITY_INSERT [dbo].[tipoTarea] OFF
GO
/****** Object:  Index [UQ__accesosP__FF937663BF8F36CD]    Script Date: 6/11/2024 11:55:30 ******/
ALTER TABLE [dbo].[accesosPorRol] ADD UNIQUE NONCLUSTERED 
(
	[idAcceso] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [UQ__alumnos__43FBBAC69B4CBBFB]    Script Date: 6/11/2024 11:55:30 ******/
ALTER TABLE [dbo].[alumnos] ADD UNIQUE NONCLUSTERED 
(
	[idAlumno] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [alumnos_index_0]    Script Date: 6/11/2024 11:55:30 ******/
CREATE NONCLUSTERED INDEX [alumnos_index_0] ON [dbo].[alumnos]
(
	[cui] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [UQ__asignaci__E1714479683765E7]    Script Date: 6/11/2024 11:55:30 ******/
ALTER TABLE [dbo].[asignacionDeCursos] ADD UNIQUE NONCLUSTERED 
(
	[idAsignacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [UQ__asignaci__7FB03CC923102BAE]    Script Date: 6/11/2024 11:55:30 ******/
ALTER TABLE [dbo].[asignacionDinamica] ADD UNIQUE NONCLUSTERED 
(
	[idAsignacionDinamica] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [UQ__cicloEsc__686060B4016A073A]    Script Date: 6/11/2024 11:55:30 ******/
ALTER TABLE [dbo].[cicloEscolar] ADD UNIQUE NONCLUSTERED 
(
	[idCicloEscolar] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [UQ__cursos__8551ED04ED47C6D8]    Script Date: 6/11/2024 11:55:30 ******/
ALTER TABLE [dbo].[cursos] ADD UNIQUE NONCLUSTERED 
(
	[idCurso] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [UQ__descripc__489CC3CA16D68CCF]    Script Date: 6/11/2024 11:55:30 ******/
ALTER TABLE [dbo].[descripcionEscalaDeRango] ADD UNIQUE NONCLUSTERED 
(
	[idDescripcionEscalaDeRango] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [UQ__descripc__2EDC742301233182]    Script Date: 6/11/2024 11:55:30 ******/
ALTER TABLE [dbo].[descripcionListaDeCotejo] ADD UNIQUE NONCLUSTERED 
(
	[idDescripcionListaDeCotejo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [UQ__descripc__8AFFEF289A55F4E3]    Script Date: 6/11/2024 11:55:30 ******/
ALTER TABLE [dbo].[descripcionRubrica] ADD UNIQUE NONCLUSTERED 
(
	[idDescripcionRubrica] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [UQ__discapac__ED53A699F0316B47]    Script Date: 6/11/2024 11:55:30 ******/
ALTER TABLE [dbo].[discapacidades] ADD UNIQUE NONCLUSTERED 
(
	[idDiscapacidad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [UQ__escalaDe__DB7AB1449815E9D1]    Script Date: 6/11/2024 11:55:30 ******/
ALTER TABLE [dbo].[escalaDeRango] ADD UNIQUE NONCLUSTERED 
(
	[idEscalaDeRango] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [UQ__grupoEtn__EC597A868F3CD07F]    Script Date: 6/11/2024 11:55:30 ******/
ALTER TABLE [dbo].[grupoEtnico] ADD UNIQUE NONCLUSTERED 
(
	[idGrupo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [UQ__horarios__DE60F33B46459773]    Script Date: 6/11/2024 11:55:30 ******/
ALTER TABLE [dbo].[horarios] ADD UNIQUE NONCLUSTERED 
(
	[idHorario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [UQ__listaDeC__0F1FE30F2D93E546]    Script Date: 6/11/2024 11:55:30 ******/
ALTER TABLE [dbo].[listaDeCotejo] ADD UNIQUE NONCLUSTERED 
(
	[idListaDeContejo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [UQ__niveles__70D8C14E70862CD7]    Script Date: 6/11/2024 11:55:30 ******/
ALTER TABLE [dbo].[niveles] ADD UNIQUE NONCLUSTERED 
(
	[idNivel] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [UQ__notas__AD5F462FE6CC55D1]    Script Date: 6/11/2024 11:55:30 ******/
ALTER TABLE [dbo].[notas] ADD UNIQUE NONCLUSTERED 
(
	[idNota] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [UQ__notasFin__B3567AF408C9A2F2]    Script Date: 6/11/2024 11:55:30 ******/
ALTER TABLE [dbo].[notasFinales] ADD UNIQUE NONCLUSTERED 
(
	[idNotaFinal] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [UQ__pagos__BD2295ACAC536BB8]    Script Date: 6/11/2024 11:55:30 ******/
ALTER TABLE [dbo].[pagos] ADD UNIQUE NONCLUSTERED 
(
	[idPago] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__personas__C1F8BFD06B51F14D]    Script Date: 6/11/2024 11:55:30 ******/
ALTER TABLE [dbo].[personas] ADD UNIQUE NONCLUSTERED 
(
	[CUI] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [persona_index_0]    Script Date: 6/11/2024 11:55:30 ******/
CREATE NONCLUSTERED INDEX [persona_index_0] ON [dbo].[personas]
(
	[correo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [UQ__respuest__76065154816F22A5]    Script Date: 6/11/2024 11:55:30 ******/
ALTER TABLE [dbo].[respuestaAsignacionDinamica] ADD UNIQUE NONCLUSTERED 
(
	[idRespuestaAsignacionDinamica] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [UQ__respuest__486DD06031B5C579]    Script Date: 6/11/2024 11:55:30 ******/
ALTER TABLE [dbo].[respuestaEscalaDeRango] ADD UNIQUE NONCLUSTERED 
(
	[idRespuestaEscalaDeRango] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [UQ__respuest__4F41B3AA516DEB5E]    Script Date: 6/11/2024 11:55:30 ******/
ALTER TABLE [dbo].[respuestaListaDeCotejo] ADD UNIQUE NONCLUSTERED 
(
	[idRespuestaListaDeCotejo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [UQ__respuest__E19DB484B99C5FAA]    Script Date: 6/11/2024 11:55:30 ******/
ALTER TABLE [dbo].[respuestaRubrica] ADD UNIQUE NONCLUSTERED 
(
	[idRespuestaRubrica] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [UQ__roles__3C872F779D8B706B]    Script Date: 6/11/2024 11:55:30 ******/
ALTER TABLE [dbo].[roles] ADD UNIQUE NONCLUSTERED 
(
	[idRol] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [UQ__rubrica__738E859DD368EE7C]    Script Date: 6/11/2024 11:55:30 ******/
ALTER TABLE [dbo].[rubrica] ADD UNIQUE NONCLUSTERED 
(
	[idRubrica] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [UQ__seccione__94B87A7D2DD817E3]    Script Date: 6/11/2024 11:55:30 ******/
ALTER TABLE [dbo].[secciones] ADD UNIQUE NONCLUSTERED 
(
	[idSeccion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [UQ__SistemaD__F52BC5B19C095294]    Script Date: 6/11/2024 11:55:30 ******/
ALTER TABLE [dbo].[SistemaDePago] ADD UNIQUE NONCLUSTERED 
(
	[idSistemaPago] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [UQ__tareas__756A540371570CA5]    Script Date: 6/11/2024 11:55:30 ******/
ALTER TABLE [dbo].[tareas] ADD UNIQUE NONCLUSTERED 
(
	[idTarea] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [UQ__tareasEn__5CDE995762298C61]    Script Date: 6/11/2024 11:55:30 ******/
ALTER TABLE [dbo].[tareasEntregadas] ADD UNIQUE NONCLUSTERED 
(
	[idTareaEntregada] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [UQ__tipocali__6F643F0AB2E92557]    Script Date: 6/11/2024 11:55:30 ******/
ALTER TABLE [dbo].[tipocalificacion] ADD UNIQUE NONCLUSTERED 
(
	[idTipoCalificacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [UQ__tipoDocu__F3B7DBCBF4AEE009]    Script Date: 6/11/2024 11:55:30 ******/
ALTER TABLE [dbo].[tipoDocumento] ADD UNIQUE NONCLUSTERED 
(
	[idTipoDoc] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [UQ__tipoEsca__66F51463181C6AE8]    Script Date: 6/11/2024 11:55:30 ******/
ALTER TABLE [dbo].[tipoEscala] ADD UNIQUE NONCLUSTERED 
(
	[ididTipoEscala] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [UQ__tipoTare__C561A3E7F96F53F0]    Script Date: 6/11/2024 11:55:30 ******/
ALTER TABLE [dbo].[tipoTarea] ADD UNIQUE NONCLUSTERED 
(
	[idTipoTarea] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [UQ__vocabula__CBF9B61DA3E4CC29]    Script Date: 6/11/2024 11:55:30 ******/
ALTER TABLE [dbo].[vocabulario] ADD UNIQUE NONCLUSTERED 
(
	[idVocabulario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[alumnos] ADD  DEFAULT ((1)) FOR [estado]
GO
ALTER TABLE [dbo].[asignacionDeCursos] ADD  DEFAULT ('A') FOR [estado]
GO
ALTER TABLE [dbo].[pagos] ADD  DEFAULT ((1)) FOR [estado]
GO
ALTER TABLE [dbo].[tareas] ADD  CONSTRAINT [df_bloqueoi]  DEFAULT ('0') FOR [bloqueoEntrega]
GO
ALTER TABLE [dbo].[alumnos]  WITH CHECK ADD FOREIGN KEY([cui])
REFERENCES [dbo].[personas] ([CUI])
GO
ALTER TABLE [dbo].[alumnos]  WITH CHECK ADD  CONSTRAINT [FK_alumnos_cicloEscolar] FOREIGN KEY([idCicloEscolar])
REFERENCES [dbo].[cicloEscolar] ([idCicloEscolar])
GO
ALTER TABLE [dbo].[alumnos] CHECK CONSTRAINT [FK_alumnos_cicloEscolar]
GO
ALTER TABLE [dbo].[alumnos]  WITH CHECK ADD  CONSTRAINT [FK_alumnos_cursos] FOREIGN KEY([idCurso])
REFERENCES [dbo].[cursos] ([idCurso])
GO
ALTER TABLE [dbo].[alumnos] CHECK CONSTRAINT [FK_alumnos_cursos]
GO
ALTER TABLE [dbo].[alumnos]  WITH CHECK ADD  CONSTRAINT [FK_alumnos_discapacidades] FOREIGN KEY([idDiscapacidad])
REFERENCES [dbo].[discapacidades] ([idDiscapacidad])
GO
ALTER TABLE [dbo].[alumnos] CHECK CONSTRAINT [FK_alumnos_discapacidades]
GO
ALTER TABLE [dbo].[alumnos]  WITH CHECK ADD  CONSTRAINT [FK_alumnos_grupoEtnico] FOREIGN KEY([idGrupoEtnico])
REFERENCES [dbo].[grupoEtnico] ([idGrupo])
GO
ALTER TABLE [dbo].[alumnos] CHECK CONSTRAINT [FK_alumnos_grupoEtnico]
GO
ALTER TABLE [dbo].[alumnos]  WITH CHECK ADD  CONSTRAINT [FK_alumnos_horarios] FOREIGN KEY([idHorario])
REFERENCES [dbo].[horarios] ([idHorario])
GO
ALTER TABLE [dbo].[alumnos] CHECK CONSTRAINT [FK_alumnos_horarios]
GO
ALTER TABLE [dbo].[alumnos]  WITH CHECK ADD  CONSTRAINT [FK_alumnos_pagos] FOREIGN KEY([idPago])
REFERENCES [dbo].[pagos] ([idPago])
GO
ALTER TABLE [dbo].[alumnos] CHECK CONSTRAINT [FK_alumnos_pagos]
GO
ALTER TABLE [dbo].[alumnos]  WITH CHECK ADD  CONSTRAINT [FK_alumnos_SistemaDePago] FOREIGN KEY([idSistemaPago])
REFERENCES [dbo].[SistemaDePago] ([idSistemaPago])
GO
ALTER TABLE [dbo].[alumnos] CHECK CONSTRAINT [FK_alumnos_SistemaDePago]
GO
ALTER TABLE [dbo].[alumnos]  WITH CHECK ADD  CONSTRAINT [FK_alumnos_tipoDocumento] FOREIGN KEY([idTipoDoc])
REFERENCES [dbo].[tipoDocumento] ([idTipoDoc])
GO
ALTER TABLE [dbo].[alumnos] CHECK CONSTRAINT [FK_alumnos_tipoDocumento]
GO
ALTER TABLE [dbo].[asignacionDeCursos]  WITH CHECK ADD  CONSTRAINT [FK_asignacionDeCursos_cicloEscolar] FOREIGN KEY([idCicloEscolar])
REFERENCES [dbo].[cicloEscolar] ([idCicloEscolar])
GO
ALTER TABLE [dbo].[asignacionDeCursos] CHECK CONSTRAINT [FK_asignacionDeCursos_cicloEscolar]
GO
ALTER TABLE [dbo].[asignacionDeCursos]  WITH CHECK ADD  CONSTRAINT [FK_asignacionDeCursos_cursos] FOREIGN KEY([idCurso])
REFERENCES [dbo].[cursos] ([idCurso])
GO
ALTER TABLE [dbo].[asignacionDeCursos] CHECK CONSTRAINT [FK_asignacionDeCursos_cursos]
GO
ALTER TABLE [dbo].[asignacionDeCursos]  WITH CHECK ADD  CONSTRAINT [FK_asignacionDeCursos_horarios] FOREIGN KEY([idHorario])
REFERENCES [dbo].[horarios] ([idHorario])
GO
ALTER TABLE [dbo].[asignacionDeCursos] CHECK CONSTRAINT [FK_asignacionDeCursos_horarios]
GO
ALTER TABLE [dbo].[asignacionDeCursos]  WITH CHECK ADD  CONSTRAINT [FK_asignacionDeCursos_personas] FOREIGN KEY([cui])
REFERENCES [dbo].[personas] ([CUI])
GO
ALTER TABLE [dbo].[asignacionDeCursos] CHECK CONSTRAINT [FK_asignacionDeCursos_personas]
GO
ALTER TABLE [dbo].[asignacionDeCursos]  WITH CHECK ADD  CONSTRAINT [FK_asignacionDeCursos_roles] FOREIGN KEY([idRol])
REFERENCES [dbo].[roles] ([idRol])
GO
ALTER TABLE [dbo].[asignacionDeCursos] CHECK CONSTRAINT [FK_asignacionDeCursos_roles]
GO
ALTER TABLE [dbo].[asignacionDeCursos]  WITH CHECK ADD  CONSTRAINT [FK_asignacionDeCursos_secciones] FOREIGN KEY([idSeccion])
REFERENCES [dbo].[secciones] ([idSeccion])
GO
ALTER TABLE [dbo].[asignacionDeCursos] CHECK CONSTRAINT [FK_asignacionDeCursos_secciones]
GO
ALTER TABLE [dbo].[asignacionDinamica]  WITH CHECK ADD FOREIGN KEY([idTarea])
REFERENCES [dbo].[tareas] ([idTarea])
GO
ALTER TABLE [dbo].[cursos]  WITH CHECK ADD  CONSTRAINT [FK_cursos_niveles] FOREIGN KEY([idNivel])
REFERENCES [dbo].[niveles] ([idNivel])
GO
ALTER TABLE [dbo].[cursos] CHECK CONSTRAINT [FK_cursos_niveles]
GO
ALTER TABLE [dbo].[cursosDisponibles]  WITH CHECK ADD FOREIGN KEY([idCurso])
REFERENCES [dbo].[cursos] ([idCurso])
GO
ALTER TABLE [dbo].[descripcionEscalaDeRango]  WITH CHECK ADD FOREIGN KEY([idEscalaDeRango])
REFERENCES [dbo].[escalaDeRango] ([idEscalaDeRango])
GO
ALTER TABLE [dbo].[descripcionListaDeCotejo]  WITH CHECK ADD FOREIGN KEY([idListaDeCotejo])
REFERENCES [dbo].[listaDeCotejo] ([idListaDeContejo])
GO
ALTER TABLE [dbo].[descripcionRubrica]  WITH CHECK ADD FOREIGN KEY([idRubirca])
REFERENCES [dbo].[rubrica] ([idRubrica])
GO
ALTER TABLE [dbo].[escalaDeRango]  WITH CHECK ADD FOREIGN KEY([idTarea])
REFERENCES [dbo].[tareas] ([idTarea])
GO
ALTER TABLE [dbo].[horarios]  WITH CHECK ADD  CONSTRAINT [FK_horarios_cursos] FOREIGN KEY([idCurso])
REFERENCES [dbo].[cursos] ([idCurso])
GO
ALTER TABLE [dbo].[horarios] CHECK CONSTRAINT [FK_horarios_cursos]
GO
ALTER TABLE [dbo].[listaDeCotejo]  WITH CHECK ADD  CONSTRAINT [FK_listaDeCotejo_tareas] FOREIGN KEY([idTarea])
REFERENCES [dbo].[tareas] ([idTarea])
GO
ALTER TABLE [dbo].[listaDeCotejo] CHECK CONSTRAINT [FK_listaDeCotejo_tareas]
GO
ALTER TABLE [dbo].[notas]  WITH CHECK ADD FOREIGN KEY([CUIalumno])
REFERENCES [dbo].[personas] ([CUI])
GO
ALTER TABLE [dbo].[notas]  WITH CHECK ADD FOREIGN KEY([CUIcolaborador])
REFERENCES [dbo].[personas] ([CUI])
GO
ALTER TABLE [dbo].[notas]  WITH CHECK ADD FOREIGN KEY([idCurso])
REFERENCES [dbo].[cursos] ([idCurso])
GO
ALTER TABLE [dbo].[notas]  WITH CHECK ADD FOREIGN KEY([idSeccion])
REFERENCES [dbo].[secciones] ([idSeccion])
GO
ALTER TABLE [dbo].[notas]  WITH CHECK ADD FOREIGN KEY([idTarea])
REFERENCES [dbo].[tareas] ([idTarea])
GO
ALTER TABLE [dbo].[notas]  WITH CHECK ADD FOREIGN KEY([idTipoCalificacion])
REFERENCES [dbo].[tipocalificacion] ([idTipoCalificacion])
GO
ALTER TABLE [dbo].[notasFinales]  WITH CHECK ADD FOREIGN KEY([CUIalumno])
REFERENCES [dbo].[personas] ([CUI])
GO
ALTER TABLE [dbo].[notasFinales]  WITH CHECK ADD FOREIGN KEY([CUIcolaborador])
REFERENCES [dbo].[personas] ([CUI])
GO
ALTER TABLE [dbo].[notasFinales]  WITH CHECK ADD FOREIGN KEY([idCicloEscolar])
REFERENCES [dbo].[cicloEscolar] ([idCicloEscolar])
GO
ALTER TABLE [dbo].[notasFinales]  WITH CHECK ADD FOREIGN KEY([idCurso])
REFERENCES [dbo].[cursos] ([idCurso])
GO
ALTER TABLE [dbo].[notasFinales]  WITH CHECK ADD FOREIGN KEY([idSeccion])
REFERENCES [dbo].[secciones] ([idSeccion])
GO
ALTER TABLE [dbo].[pagos]  WITH CHECK ADD  CONSTRAINT [FK_pagos_SistemaDePago] FOREIGN KEY([idSistemaPago])
REFERENCES [dbo].[SistemaDePago] ([idSistemaPago])
GO
ALTER TABLE [dbo].[pagos] CHECK CONSTRAINT [FK_pagos_SistemaDePago]
GO
ALTER TABLE [dbo].[personas]  WITH CHECK ADD FOREIGN KEY([idRol])
REFERENCES [dbo].[roles] ([idRol])
GO
ALTER TABLE [dbo].[respuestaAsignacionDinamica]  WITH CHECK ADD FOREIGN KEY([idAsignacionDinamica])
REFERENCES [dbo].[asignacionDinamica] ([idAsignacionDinamica])
GO
ALTER TABLE [dbo].[respuestaAsignacionDinamica]  WITH CHECK ADD FOREIGN KEY([idNota])
REFERENCES [dbo].[notas] ([idNota])
GO
ALTER TABLE [dbo].[respuestaEscalaDeRango]  WITH CHECK ADD FOREIGN KEY([idDescripcionEscalaDeRango])
REFERENCES [dbo].[descripcionEscalaDeRango] ([idDescripcionEscalaDeRango])
GO
ALTER TABLE [dbo].[respuestaEscalaDeRango]  WITH CHECK ADD FOREIGN KEY([idEscalaDeRango])
REFERENCES [dbo].[escalaDeRango] ([idEscalaDeRango])
GO
ALTER TABLE [dbo].[respuestaEscalaDeRango]  WITH CHECK ADD FOREIGN KEY([idNota])
REFERENCES [dbo].[notas] ([idNota])
GO
ALTER TABLE [dbo].[respuestaEscalaDeRango]  WITH CHECK ADD  CONSTRAINT [FK_respuestaEscalaDeRango_tipoEscala] FOREIGN KEY([idTipoEscala])
REFERENCES [dbo].[tipoEscala] ([ididTipoEscala])
GO
ALTER TABLE [dbo].[respuestaEscalaDeRango] CHECK CONSTRAINT [FK_respuestaEscalaDeRango_tipoEscala]
GO
ALTER TABLE [dbo].[respuestaListaDeCotejo]  WITH CHECK ADD FOREIGN KEY([idDescripcionListaDeCotejo])
REFERENCES [dbo].[descripcionListaDeCotejo] ([idDescripcionListaDeCotejo])
GO
ALTER TABLE [dbo].[respuestaListaDeCotejo]  WITH CHECK ADD FOREIGN KEY([idListaDeCotejo])
REFERENCES [dbo].[listaDeCotejo] ([idListaDeContejo])
GO
ALTER TABLE [dbo].[respuestaListaDeCotejo]  WITH CHECK ADD FOREIGN KEY([idNota])
REFERENCES [dbo].[notas] ([idNota])
GO
ALTER TABLE [dbo].[respuestaRubrica]  WITH CHECK ADD FOREIGN KEY([idDescripcionRubrica])
REFERENCES [dbo].[descripcionRubrica] ([idDescripcionRubrica])
GO
ALTER TABLE [dbo].[respuestaRubrica]  WITH CHECK ADD FOREIGN KEY([idNota])
REFERENCES [dbo].[notas] ([idNota])
GO
ALTER TABLE [dbo].[respuestaRubrica]  WITH CHECK ADD FOREIGN KEY([idRubrica])
REFERENCES [dbo].[rubrica] ([idRubrica])
GO
ALTER TABLE [dbo].[rubrica]  WITH CHECK ADD FOREIGN KEY([idTarea])
REFERENCES [dbo].[tareas] ([idTarea])
GO
ALTER TABLE [dbo].[secciones]  WITH CHECK ADD  CONSTRAINT [FK_secciones_cursos] FOREIGN KEY([idCurso])
REFERENCES [dbo].[cursos] ([idCurso])
GO
ALTER TABLE [dbo].[secciones] CHECK CONSTRAINT [FK_secciones_cursos]
GO
ALTER TABLE [dbo].[secciones]  WITH CHECK ADD  CONSTRAINT [FK_secciones_horarios] FOREIGN KEY([idHorario])
REFERENCES [dbo].[horarios] ([idHorario])
GO
ALTER TABLE [dbo].[secciones] CHECK CONSTRAINT [FK_secciones_horarios]
GO
ALTER TABLE [dbo].[tareas]  WITH CHECK ADD  CONSTRAINT [FK_tareas_cursos] FOREIGN KEY([idCurso])
REFERENCES [dbo].[cursos] ([idCurso])
GO
ALTER TABLE [dbo].[tareas] CHECK CONSTRAINT [FK_tareas_cursos]
GO
ALTER TABLE [dbo].[tareas]  WITH CHECK ADD  CONSTRAINT [FK_tareas_horarios] FOREIGN KEY([idHorario])
REFERENCES [dbo].[horarios] ([idHorario])
GO
ALTER TABLE [dbo].[tareas] CHECK CONSTRAINT [FK_tareas_horarios]
GO
ALTER TABLE [dbo].[tareas]  WITH CHECK ADD  CONSTRAINT [FK_tareas_personas] FOREIGN KEY([cuiUsuarioCrea])
REFERENCES [dbo].[personas] ([CUI])
GO
ALTER TABLE [dbo].[tareas] CHECK CONSTRAINT [FK_tareas_personas]
GO
ALTER TABLE [dbo].[tareas]  WITH CHECK ADD  CONSTRAINT [FK_tareas_secciones] FOREIGN KEY([idSeccion])
REFERENCES [dbo].[secciones] ([idSeccion])
GO
ALTER TABLE [dbo].[tareas] CHECK CONSTRAINT [FK_tareas_secciones]
GO
ALTER TABLE [dbo].[tareas]  WITH CHECK ADD  CONSTRAINT [FK_tareas_tipocalificacion] FOREIGN KEY([idTipoCalificacion])
REFERENCES [dbo].[tipocalificacion] ([idTipoCalificacion])
GO
ALTER TABLE [dbo].[tareas] CHECK CONSTRAINT [FK_tareas_tipocalificacion]
GO
ALTER TABLE [dbo].[tareas]  WITH CHECK ADD  CONSTRAINT [FK_tareas_tipoTarea] FOREIGN KEY([idTipoTarea])
REFERENCES [dbo].[tipoTarea] ([idTipoTarea])
GO
ALTER TABLE [dbo].[tareas] CHECK CONSTRAINT [FK_tareas_tipoTarea]
GO
ALTER TABLE [dbo].[tareasEntregadas]  WITH CHECK ADD FOREIGN KEY([CUIalumno])
REFERENCES [dbo].[personas] ([CUI])
GO
ALTER TABLE [dbo].[tareasEntregadas]  WITH CHECK ADD FOREIGN KEY([idSeccion])
REFERENCES [dbo].[secciones] ([idSeccion])
GO
ALTER TABLE [dbo].[tareasEntregadas]  WITH CHECK ADD FOREIGN KEY([idTarea])
REFERENCES [dbo].[tareas] ([idTarea])
GO
ALTER TABLE [dbo].[vocabulario]  WITH CHECK ADD FOREIGN KEY([cuiUsuarioCrea])
REFERENCES [dbo].[personas] ([CUI])
GO
ALTER TABLE [dbo].[vocabulario]  WITH CHECK ADD FOREIGN KEY([idCurso])
REFERENCES [dbo].[cursos] ([idCurso])
GO
ALTER TABLE [dbo].[vocabulario]  WITH CHECK ADD FOREIGN KEY([idHorario])
REFERENCES [dbo].[horarios] ([idHorario])
GO
ALTER TABLE [dbo].[vocabulario]  WITH CHECK ADD FOREIGN KEY([idSeccion])
REFERENCES [dbo].[secciones] ([idSeccion])
GO
/****** Object:  StoredProcedure [dbo].[sp_actualizarAsignacionDeCurso]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[sp_actualizarAsignacionDeCurso]  
	@idAsignacion int,
    @cui NVARCHAR(30),  
    @idCurso INT,  
    @idRol INT,  
    @idHorario INT,  
    @idSeccion INT,  
    @resultado INT OUTPUT  
AS  
BEGIN  
    -- Verificar si la asignación existe
    IF NOT EXISTS (SELECT 1 
                   FROM asignacionDeCursos 
                   WHERE idAsignacion = @idAsignacion)
    BEGIN  
        SET @resultado = -1 -- La asignación no existe  
    END  
    ELSE  
    BEGIN  
        -- Actualizar los datos de la asignación
        UPDATE asignacionDeCursos  
        SET cui = @cui,
           idCurso = @idCurso, 
           idHorario = @idHorario ,
           idSeccion = @idSeccion 
		  WHERE idAsignacion = @idAsignacion

        IF @@ROWCOUNT > 0  
        BEGIN  
            SET @resultado = 1 -- Actualización exitosa  
        END  
        ELSE  
        BEGIN  
            SET @resultado = 0 -- Error al actualizar  
        END  
    END  
END  
GO
/****** Object:  StoredProcedure [dbo].[sp_actualizarCursos]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROC [dbo].[sp_actualizarCursos]
	@idCurso INT,
	@nombreCurso NVARCHAR(500),
    @descripcionCurso NVARCHAR(1000),
	@idNivel int, 
    @resultado INT OUTPUT
AS
BEGIN
    -- Verificamos si el rol existe
    IF NOT EXISTS (SELECT 1 FROM cursos WHERE idCurso = @idCurso)
    BEGIN
        SET @resultado = -1 -- No existe el rol
    END
    ELSE
    BEGIN
        -- Actualizamos el rol

        UPDATE cursos
        SET descripcionCurso = @descripcionCurso, 
		nombreCurso = @nombreCurso, 
		idNivel = @idNivel
        WHERE idCurso = @idCurso

        IF @@ROWCOUNT > 0
        BEGIN
            SET @resultado = 1 -- Actualización exitosa
        END
        ELSE
        BEGIN
            SET @resultado = 0 -- Error al actualizar
        END
    END
END


GO
/****** Object:  StoredProcedure [dbo].[sp_actualizarCursosDisponibles]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROC [dbo].[sp_actualizarCursosDisponibles]
	@idCursoDispobible INT,
	@idCurso INT,
	@requisito INT,
	@fechaInicio DATE,
    @resultado INT OUTPUT
AS
BEGIN
    -- Verificamos si el rol existe
    IF NOT EXISTS (SELECT 1 FROM cursosDisponibles WHERE idCursoDispobible = @idCursoDispobible)
    BEGIN
        SET @resultado = -1 -- No existe el horario
    END
    ELSE
    BEGIN
        -- Actualizamos el rol

        UPDATE cursosDisponibles
        SET 
			idCurso = @idCurso,
			requisito = @requisito,
			fechaInicio = @fechaInicio
        WHERE idCursoDispobible = @idCursoDispobible

        IF @@ROWCOUNT > 0
        BEGIN
            SET @resultado = 1 -- Actualización exitosa
        END
        ELSE
        BEGIN
            SET @resultado = 0 -- Error al actualizar
        END
    END
END



GO
/****** Object:  StoredProcedure [dbo].[sp_actualizarDiscapacidades]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROC [dbo].[sp_actualizarDiscapacidades]
	@idDiscapacidad INT,
	@nombre NVARCHAR(500),
    @descripcion NVARCHAR(1000),
    @resultado INT OUTPUT
AS
BEGIN
    -- Verificamos si el rol existe
    IF NOT EXISTS (SELECT 1 FROM discapacidades WHERE idDiscapacidad = @idDiscapacidad)
    BEGIN
        SET @resultado = -1 -- No existe el rol
    END
    ELSE
    BEGIN
        -- Actualizamos el rol

        UPDATE discapacidades
        SET descripcion = @descripcion, 
		nombre = @nombre
        WHERE idDiscapacidad = @idDiscapacidad

        IF @@ROWCOUNT > 0
        BEGIN
            SET @resultado = 1 -- Actualización exitosa
        END
        ELSE
        BEGIN
            SET @resultado = 0 -- Error al actualizar
        END
    END
END


GO
/****** Object:  StoredProcedure [dbo].[sp_actualizarGrupoEtnico]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROC [dbo].[sp_actualizarGrupoEtnico]
	@idGrupo INT,
	@nombreGrupo NVARCHAR(500),
    @descripcion NVARCHAR(1000),
    @resultado INT OUTPUT
AS
BEGIN
    -- Verificamos si el rol existe
    IF NOT EXISTS (SELECT 1 FROM grupoEtnico WHERE idGrupo = @idGrupo)
    BEGIN
        SET @resultado = -1 -- No existe el rol
    END
    ELSE
    BEGIN
        -- Actualizamos el rol

        UPDATE grupoEtnico
        SET descripcion = @descripcion, 
		nombreGrupo = @nombreGrupo
        WHERE idGrupo = @idGrupo

        IF @@ROWCOUNT > 0
        BEGIN
            SET @resultado = 1 -- Actualización exitosa
        END
        ELSE
        BEGIN
            SET @resultado = 0 -- Error al actualizar
        END
    END
END


GO
/****** Object:  StoredProcedure [dbo].[sp_actualizarHorario]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROC [dbo].[sp_actualizarHorario]
	@idHorario INT,
	@horario NVARCHAR(200),
    @descripcion NVARCHAR(600),
	@idCurso int, 
    @resultado INT OUTPUT
AS
BEGIN
    -- Verificamos si el rol existe
    IF NOT EXISTS (SELECT 1 FROM horarios WHERE idHorario = @idHorario)
    BEGIN
        SET @resultado = -1 -- No existe el rol
    END
    ELSE
    BEGIN
        -- Actualizamos el rol

        UPDATE horarios
        SET horario = @horario, 
		descripcion = @descripcion, 
		idCurso = @idCurso
        WHERE idHorario = @idHorario

        IF @@ROWCOUNT > 0
        BEGIN
            SET @resultado = 1 -- Actualización exitosa
        END
        ELSE
        BEGIN
            SET @resultado = 0 -- Error al actualizar
        END
    END
END



GO
/****** Object:  StoredProcedure [dbo].[sp_actualizarNivel]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[sp_actualizarNivel]
	@idNivel INT,
    @nombreNivel NVARCHAR(500),
    @resultado INT OUTPUT
AS
BEGIN
    -- Verificamos si el rol existe
    IF NOT EXISTS (SELECT 1 FROM niveles WHERE idNivel = @idNivel)
    BEGIN
        SET @resultado = -1 -- No existe el rol
    END
    ELSE
    BEGIN
        -- Actualizamos el rol
        UPDATE niveles
        SET nombreNivel = @nombreNivel
        WHERE idNivel = @idNivel

        IF @@ROWCOUNT > 0
        BEGIN
            SET @resultado = 1 -- Actualización exitosa
        END
        ELSE
        BEGIN
            SET @resultado = 0 -- Error al actualizar
        END
    END
END
GO
/****** Object:  StoredProcedure [dbo].[sp_actualizarPersona]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[sp_actualizarPersona]
    @CUI NVARCHAR(60),
    @primerNombre NVARCHAR(200),
    @segundoNombre NVARCHAR(600),
    @primerApellido NVARCHAR(200),
    @segundoApellido NVARCHAR(600),
    @fechaDeNacimiento DATE,
    @correo NVARCHAR(510),
    @telefono NVARCHAR(30),
    @genero CHAR(1),
    @idRol INT,
    --@contrasenia NVARCHAR(4000),
   -- @requiereCambio CHAR(1),
    @codigoPersonal NVARCHAR(60),
    @estado CHAR(1),
    @direccion NVARCHAR(600),
    @resultado INT OUTPUT
AS
BEGIN
    -- Verificamos si el CUI existe
    IF NOT EXISTS (SELECT 1 FROM personas WHERE CUI = @CUI)
    BEGIN
        SET @resultado = -1 -- No existe la persona
    END
    ELSE IF EXISTS (SELECT 1 FROM personas WHERE correo = @correo AND CUI != @CUI)
    BEGIN
        SET @resultado = -2 -- Otro usuario tiene este correo
    END
    ELSE
    BEGIN
        -- Actualizamos los datos de la persona
        UPDATE personas
        SET
            primerNombre = @primerNombre,
            segundoNombre = @segundoNombre,
            primerApellido = @primerApellido,
            segundoApellido = @segundoApellido,
            fechaDeNacimiento = @fechaDeNacimiento,
            correo = @correo,
            telefono = @telefono,
            genero = @genero,
            idRol = @idRol,
           -- contrasenia = @contrasenia,
           -- requiereCambio = @requiereCambio,
            codigoPersonal = @codigoPersonal,
            estado = @estado,
            direccion = @direccion
        WHERE CUI = @CUI

        IF @@ROWCOUNT > 0
        BEGIN
            SET @resultado = 1 -- Actualización exitosa
        END
        ELSE
        BEGIN
            SET @resultado = 0 -- Error al actualizar
        END
    END
END
GO
/****** Object:  StoredProcedure [dbo].[sp_actualizarRol]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROC [dbo].[sp_actualizarRol]
    @idRol INT,
    @descripcionDeRol NVARCHAR(200),
    @accesos NVARCHAR(200),
    @resultado INT OUTPUT
AS
BEGIN
    -- Verificamos si el rol existe
    IF NOT EXISTS (SELECT 1 FROM roles WHERE idRol = @idRol)
    BEGIN
        SET @resultado = -1 -- No existe el rol
    END
    ELSE
    BEGIN
        -- Actualizamos el rol
        UPDATE roles
        SET descripcionDeRol = @descripcionDeRol, accesos = @accesos
        WHERE idRol = @idRol

        IF @@ROWCOUNT > 0
        BEGIN
            SET @resultado = 1 -- Actualización exitosa
        END
        ELSE
        BEGIN
            SET @resultado = 0 -- Error al actualizar
        END
    END
END
GO
/****** Object:  StoredProcedure [dbo].[sp_actualizarSecciones]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROC [dbo].[sp_actualizarSecciones]
	@idSeccion INT,
	@idCurso INT, 
	@idHorario INT ,
	@descripcion NVARCHAR(200),
    @resultado INT OUTPUT
AS
BEGIN
    -- Verificamos si el rol existe
    IF NOT EXISTS (SELECT 1 FROM secciones WHERE idSeccion = @idSeccion)
    BEGIN
        SET @resultado = -1 -- No existe el horario
    END
    ELSE
    BEGIN
        -- Actualizamos el rol

        UPDATE secciones
        SET idCurso = @idCurso, 
		descripcion = @descripcion, 
		idHorario = @idHorario
        WHERE idSeccion = @idSeccion

        IF @@ROWCOUNT > 0
        BEGIN
            SET @resultado = 1 -- Actualización exitosa
        END
        ELSE
        BEGIN
            SET @resultado = 0 -- Error al actualizar
        END
    END
END



GO
/****** Object:  StoredProcedure [dbo].[sp_actualizarSistemaDePago]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROC [dbo].[sp_actualizarSistemaDePago]
	@idSistemaPago INT,
    @nombre NVARCHAR(500),
	@DESCRIPCION NVARCHAR (1000),
    @resultado INT OUTPUT
AS
BEGIN
    -- Verificamos si el rol existe
    IF NOT EXISTS (SELECT 1 FROM SistemaDePago WHERE idSistemaPago = @idSistemaPago)
    BEGIN
        SET @resultado = -1 -- No existe el rol
    END
    ELSE
    BEGIN
        -- Actualizamos el rol

        UPDATE SistemaDePago
        SET nombre = @nombre,
			DESCRIPCION =@DESCRIPCION
        WHERE idSistemaPago = @idSistemaPago

        IF @@ROWCOUNT > 0
        BEGIN
            SET @resultado = 1 -- Actualización exitosa
        END
        ELSE
        BEGIN
            SET @resultado = 0 -- Error al actualizar
        END
    END
END


GO
/****** Object:  StoredProcedure [dbo].[sp_actualizarTipocalificacion]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROC [dbo].[sp_actualizarTipocalificacion]
	@idTipoCalificacion INT,
    @descripcion NVARCHAR(500),
    @resultado INT OUTPUT
AS
BEGIN
    -- Verificamos si el rol existe
    IF NOT EXISTS (SELECT 1 FROM Tipocalificacion WHERE idTipoCalificacion = @idTipoCalificacion)
    BEGIN
        SET @resultado = -1 -- No existe el rol
    END
    ELSE
    BEGIN
        -- Actualizamos el rol

        UPDATE tipocalificacion
        SET descripcion = @descripcion
        WHERE idTipoCalificacion = @idTipoCalificacion

        IF @@ROWCOUNT > 0
        BEGIN
            SET @resultado = 1 -- Actualización exitosa
        END
        ELSE
        BEGIN
            SET @resultado = 0 -- Error al actualizar
        END
    END
END


GO
/****** Object:  StoredProcedure [dbo].[sp_actualizarTipoDocumento]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROC [dbo].[sp_actualizarTipoDocumento]
	@idTipoDoc INT,
    @nombre NVARCHAR(500),
    @resultado INT OUTPUT
AS
BEGIN
    -- Verificamos si el rol existe
    IF NOT EXISTS (SELECT 1 FROM tipoDocumento WHERE idTipoDoc = @idTipoDoc)
    BEGIN
        SET @resultado = -1 -- No existe el rol
    END
    ELSE
    BEGIN
        -- Actualizamos el rol
        UPDATE tipoDocumento
        SET nombre = @nombre
        WHERE idTipoDoc = @idTipoDoc

        IF @@ROWCOUNT > 0
        BEGIN
            SET @resultado = 1 -- Actualización exitosa
        END
        ELSE
        BEGIN
            SET @resultado = 0 -- Error al actualizar
        END
    END
END


GO
/****** Object:  StoredProcedure [dbo].[sp_actualizarTipoEscala]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROC [dbo].[sp_actualizarTipoEscala]
	@idTipoEscala INT,
    @descripcion NVARCHAR(500),
    @resultado INT OUTPUT
AS
BEGIN
    -- Verificamos si el rol existe
    IF NOT EXISTS (SELECT 1 FROM tipoEscala WHERE ididTipoEscala = @idTipoEscala)
    BEGIN
        SET @resultado = -1 -- No existe el rol
    END
    ELSE
    BEGIN
        -- Actualizamos el rol

        UPDATE tipoEscala
        SET descripcion = @descripcion
        WHERE ididTipoEscala = @idTipoEscala

        IF @@ROWCOUNT > 0
        BEGIN
            SET @resultado = 1 -- Actualización exitosa
        END
        ELSE
        BEGIN
            SET @resultado = 0 -- Error al actualizar
        END
    END
END


GO
/****** Object:  StoredProcedure [dbo].[sp_actualizarTipoTarea]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROC [dbo].[sp_actualizarTipoTarea]
	@idTipoTarea INT,
    @descripcion NVARCHAR(500),
    @resultado INT OUTPUT
AS
BEGIN
    -- Verificamos si el rol existe
    IF NOT EXISTS (SELECT 1 FROM tipoTarea WHERE idTipoTarea = @idTipoTarea)
    BEGIN
        SET @resultado = -1 -- No existe el rol
    END
    ELSE
    BEGIN
        -- Actualizamos el rol

        UPDATE tipoTarea
        SET descripcion = @descripcion
        WHERE idTipoTarea = @idTipoTarea

        IF @@ROWCOUNT > 0
        BEGIN
            SET @resultado = 1 -- Actualización exitosa
        END
        ELSE
        BEGIN
            SET @resultado = 0 -- Error al actualizar
        END
    END
END


GO
/****** Object:  StoredProcedure [dbo].[sp_cambiarContrasenia]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[sp_cambiarContrasenia]
	@cui varchar(30),
	@contrasenia  varchar(max),
	@resultado INT OUTPUT
AS
BEGIN 

	UPDATE personas
		SET contrasenia = @contrasenia,
			requierecambio = 0
	WHERE CUI = @cui
        IF @@ROWCOUNT > 0
        BEGIN
            SET @resultado = 1 -- Actualización exitosa
        END
        ELSE
        BEGIN
            SET @resultado = 0 -- Error al actualizar
        END
END
GO
/****** Object:  StoredProcedure [dbo].[sp_consultarCiclos]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROC [dbo].[sp_consultarCiclos]  
AS  
BEGIN  
    -- Consultamos todos los roles  
SELECT [idCicloEscolar]
      ,[descripcion]
      ,[fecharInicio]
      ,[fechaFin]
      ,[anio]
      ,[estado]
  FROM [dbo].[cicloEscolar]

END  
GO
/****** Object:  StoredProcedure [dbo].[sp_consultarCursos]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[sp_consultarCursos]  
AS  
BEGIN  
    -- Consultamos todos los roles  
SELECT	idCurso , 
		nombreCurso, 
		descripcionCurso,
      c.estado,
		n.idNivel, 
		n.nombreNivel	
  FROM cursos c inner join niveles n on n.idNivel = c.idNivel


END  

GO
/****** Object:  StoredProcedure [dbo].[sp_consultarCursosDisponibles]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[sp_consultarCursosDisponibles]
AS  
BEGIN  
    -- Consultamos todos los cursos disponibles con sus respectivos requisitos y estados
    SELECT 
        s.idCursoDispobible,  -- Corregido el nombre de la columna
        s.idCurso,
        s.requisito,
        s.estado,
        c.nombreCurso,
        CASE 
            WHEN s.requisito > 0 THEN (SELECT nombreNivel FROM niveles WHERE idNivel = s.requisito)
            ELSE 'Sin Requisito'
        END AS DescripcionRequisito, 
		fechaInicio
    FROM cursosDisponibles s
    INNER JOIN cursos c ON c.idCurso = s.idCurso;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_consultarDiscapacidades]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROC [dbo].[sp_consultarDiscapacidades]  
AS  
BEGIN  
    -- Consultamos todos los roles  
SELECT	idDiscapacidad , 
		nombre, 
		descripcion
      ,estado
  FROM Discapacidades


END  


GO
/****** Object:  StoredProcedure [dbo].[sp_consultarGrupoEtnico]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROC [dbo].[sp_consultarGrupoEtnico]  
AS  
BEGIN  
    -- Consultamos todos los roles  
SELECT	idGrupo , 
		nombreGrupo, 
		descripcion
      ,estado
  FROM grupoEtnico


END  


GO
/****** Object:  StoredProcedure [dbo].[sp_consultarHorarios]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROC [dbo].[sp_consultarHorarios]  
AS  
BEGIN  
    -- Consultamos todos los roles  
SELECT	idHorario,
		horario,
		descripcion,
		c.estado,
		c.idCurso	,
		nombreCurso
  FROM horarios c inner join cursos n on n.idCurso = c.idCurso


END  

GO
/****** Object:  StoredProcedure [dbo].[sp_consultarListadoRevisionInscripciones]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
  
CREATE proc [dbo].[sp_consultarListadoRevisionInscripciones]  
AS  
BEGIN  
SELECT  
 p.CUI,   
 upper(p.primerNombre +' '+ p.segundoNombre) as Nombres,  
 upper(p.primerApellido +' '+ p.segundoApellido) as Apellidos,  
 fechaDeNacimiento,   
 correo,   
 telefono,   
 case genero when 'M' THEN 'Masculino' when 'F' THEN 'Femenino' else ''end as genero,   
 idRol,   
 codigoPersonal,   
 case p.estado WHEN 'R' THEN 'REVISION'ELSE '--'END AS estado,   
 direccion,   
 idAlumno,   
 (select h.horario  from horarios h where h.idHorario = a.idHorario) as horario,  
  
 CASE residenteLocal WHEN 'S' THEN 'SI' ELSE 'NO' END AS residenteLocal,   
 (select d.nombre from tipoDocumento d where d.idTipoDoc = a.idTipoDoc) as tipoDocumento,  
 (select e.nombreGrupo from grupoEtnico e where e.idGrupo = a.idGrupoEtnico) as nombreGrupo,   
 case discapacidad when 'S' THEN 'SI' ELSE 'NO' END AS discapacidad,   
 (select dis.nombre from discapacidades dis where dis.idDiscapacidad = a.idDiscapacidad) as nombreDiscapacidad,   
 esColaborador,   
 areaDeTrabajo,   
 imgDPI,   
 (select sp.nombre from sistemaDePago sp where sp.idSistemaPago = a.idSistemaPago) as sistemaDePago,   
 (select nombreCurso from cursos c where c.idCurso = a.idCurso)  as nombreCurso,   
 fechaPago,   
 nombreCuentaOrigen,   
 relacionInscrito,   
 nit,   
 nombreNit,   
 direccionNit,   
 numeroAutorizacion,   
 imgTransferencia, 
 pg.montoPago, 
 pg.idPago
  
FROM personas p  
INNER JOIN alumnos a on p.cui = a.cui  
INNER JOIN pagos pg on pg.idPago = a.idPago  
WHERE p.estado ='R'  
AND idCicloEscolar = (select top 1 idCicloEscolar from cicloEscolar where estado ='A')  
AND a.estado =1
AND pg.estado = 1
  
END  
  
GO
/****** Object:  StoredProcedure [dbo].[sp_consultarNiveles]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROC [dbo].[sp_consultarNiveles]  
AS  
BEGIN  
    -- Consultamos todos los roles  
SELECT idNivel, 
		nombreNivel
      ,[estado]
  FROM niveles

END  
GO
/****** Object:  StoredProcedure [dbo].[sp_consultarPersona]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[sp_consultarPersona]
    @CUI NVARCHAR(60)
AS
BEGIN
    -- Consultamos la persona por CUI
    SELECT 
        CUI, 
		primerNombre, 
		segundoNombre, 
		primerApellido, 
		segundoApellido, 
        fechaDeNacimiento, 
		correo, telefono, 
		genero, 
		idRol, 
		--contrasenia, 
        requiereCambio,
		codigoPersonal, 
		estado, 
		direccion
    FROM personas
    WHERE CUI = @CUI
END
GO
/****** Object:  StoredProcedure [dbo].[sp_consultarSecciones]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROC [dbo].[sp_consultarSecciones]  
AS  
BEGIN  
    -- Consultamos todos los roles  
SELECT	s.idSeccion,
		s.idCurso,
		s.idHorario,
		s.estado,
		s.descripcion,
		c.nombreCurso, 
		h.horario
  FROM secciones s 
	inner join cursos c on c.idCurso = s.idCurso
	inner join horarios h on h.idHorario = s.idHorario


END  


GO
/****** Object:  StoredProcedure [dbo].[sp_consultarSistemaDePago]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
cREATE PROC [dbo].[sp_consultarSistemaDePago]  
AS  
BEGIN  
    -- Consultamos todos los roles  
SELECT	idSistemaPago , 
		nombre, 
		DESCRIPCION
      ,estado
  FROM SistemaDePago

END  

GO
/****** Object:  StoredProcedure [dbo].[sp_consultarTipocalificacion]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
cREATE PROC [dbo].[sp_consultarTipocalificacion]  
AS  
BEGIN  
    -- Consultamos todos los roles  
SELECT	idTipoCalificacion , 
		descripcion
      ,estado
  FROM tipocalificacion


END  

GO
/****** Object:  StoredProcedure [dbo].[sp_consultarTipoDocumento]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROC [dbo].[sp_consultarTipoDocumento]  
AS  
BEGIN  
    -- Consultamos todos los roles  
SELECT	idTipoDoc , 
		nombre
      ,estado
  FROM tipoDocumento

END  
GO
/****** Object:  StoredProcedure [dbo].[sp_consultarTipoEscala]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[sp_consultarTipoEscala]  
AS  
BEGIN  
    -- Consultamos todos los roles  
SELECT	ididTipoEscala as idTipoEscala, 
		descripcion
      ,estado
  FROM tipoEscala


END  

GO
/****** Object:  StoredProcedure [dbo].[sp_consultarTipoTarea]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
cREATE PROC [dbo].[sp_consultarTipoTarea]  
AS  
BEGIN  
    -- Consultamos todos los roles  
SELECT	idTipoTarea , 
		descripcion
      ,estado
  FROM tipoTarea


END  

GO
/****** Object:  StoredProcedure [dbo].[sp_consultarTodasPersonas]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[sp_consultarTodasPersonas] --	EXEC [sp_consultarTodasPersonas] '',0
@estado char(1), 
@idRol int
AS
BEGIN
	IF(@estado IN ('A','I'))
    -- Consultamos todas las personas
	BEGIN
		SELECT 
			CUI, 
			primerNombre+' '+ 
			segundoNombre as Nombres, 
			primerApellido +' '+ 
			segundoApellido as Apellidos, 
			fechaDeNacimiento, 
			correo, 
			telefono, 
			genero, 
			idRol, 
			--contrasenia, 
			requiereCambio, 
			codigoPersonal, 
			case estado when 'A' THEN 'Activo' else'Inactivo'end as estado, 
			direccion
			FROM personas
				WHERE estado = @estado
				and ((@idRol = 3 and idRol=@idRol)or (@idRol != 3 and idRol!=3)) and estado IN ('A','I')
	END
		ELSE
	BEGIN 
		SELECT 
			CUI, 
			primerNombre+' '+ 
			segundoNombre as Nombres, 
			primerApellido +' '+ 
			segundoApellido as Apellidos, 
			fechaDeNacimiento, 
			correo, 
			telefono, 
			genero, 
			idRol, 
			--contrasenia, 
			requiereCambio, 
			codigoPersonal, 
			case estado when 'A' THEN 'Activo' else'Inactivo'end as estado, 
			direccion
				FROM personas
				Where ((@idRol = 3 and idRol=@idRol)or (@idRol != 3 and idRol!=3)) and estado IN ('A','I')

	END
END



GO
/****** Object:  StoredProcedure [dbo].[sp_consultarTodosAlumnos]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[sp_consultarTodosAlumnos] --	EXEC [sp_consultarTodosAlumnos] 'I'
@estado char(1)
AS
BEGIN
	IF(@estado IN ('A','I'))
    -- Consultamos todas las personas
	BEGIN
		SELECT 
			p.CUI, 
			p.primerNombre+' '+ 
			p.segundoNombre as Nombres, 
			p.primerApellido +' '+ 
			p.segundoApellido as Apellidos, 
			idCurso, 
			idHorario,
			case p.estado when 'A' THEN 'Activo' else'Inactivo'end as estado
			
				FROM personas p
				INNER JOIN alumnos a on a.cui = p.CUI
				Where  ((p.idRol = 3) and p.estado IN ('A','I'))
				and p.estado = @estado

	END
		ELSE
	BEGIN 
		SELECT 
			p.CUI, 
			p.primerNombre+' '+ 
			p.segundoNombre as Nombres, 
			p.primerApellido +' '+ 
			p.segundoApellido as Apellidos, 
			idCurso, 
			idHorario,
			case p.estado when 'A' THEN 'Activo' else'Inactivo'end as estado
			
				FROM personas p
				INNER JOIN alumnos a on a.cui = p.CUI
				Where  ((p.idRol = 3) and p.estado IN ('A','I'))

	END
END



GO
/****** Object:  StoredProcedure [dbo].[sp_consultarTodosRoles]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROC [dbo].[sp_consultarTodosRoles]
AS
BEGIN
    -- Consultamos todos los roles
    SELECT idRol, descripcionDeRol, accesos
    FROM roles
END
GO
/****** Object:  StoredProcedure [dbo].[sp_eliminarAsignacionDeCurso]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[sp_eliminarAsignacionDeCurso]  
    @idAsignacion INT,  
    @resultado INT OUTPUT  
AS  
BEGIN  
    -- Verificar si la asignación existe
    IF NOT EXISTS (SELECT 1 
                   FROM asignacionDeCursos 
                   WHERE idAsignacion = @idAsignacion)
    BEGIN  
        SET @resultado = -1 -- La asignación no existe  
    END  
    ELSE  
    BEGIN  
        DECLARE @estadoActual CHAR(1)
        SELECT @estadoActual = estado 
        FROM asignacionDeCursos 
        WHERE idAsignacion = @idAsignacion

        -- Alternar el estado
        IF (@estadoActual = 'A')  
            SET @estadoActual = 'I'  
        ELSE  
            SET @estadoActual = 'A'  

        -- Actualizar el estado en la tabla
        UPDATE asignacionDeCursos  
        SET estado = @estadoActual  
        WHERE idAsignacion = @idAsignacion

        IF @@ROWCOUNT > 0  
        BEGIN  
            IF (@estadoActual = 'A')  
                SET @resultado = 2 -- Activado
            ELSE  
                SET @resultado = 1 -- Desactivado
        END  
        ELSE  
        BEGIN  
            SET @resultado = 0 -- Error al actualizar el estado  
        END  
    END  
END  
GO
/****** Object:  StoredProcedure [dbo].[sp_eliminarCursos]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[sp_eliminarCursos]
	@idCurso INT,
    @resultado INT OUTPUT
AS
BEGIN

    -- Verificamos si el rol existe
    IF NOT EXISTS (SELECT 1 FROM cursos WHERE idCurso = @idCurso)
    BEGIN
        SET @resultado = -1 -- No existe el rol
    END
    ELSE
    BEGIN
	DECLARE @estado char(1)
	select @estado = estado from cursos   WHERE idCurso = @idCurso
	IF(@estado = 'A')
	BEGIN 
		SET @estado = 'I'
	END
	ELSE 
		BEGIN 
		SET @estado = 'A'
	END
        -- Actualizamos el rol
        UPDATE cursos
        SET estado = @estado
        WHERE idCurso = @idCurso

        IF @@ROWCOUNT > 0 
        BEGIN
			IF(@estado = 'A')
				BEGIN 
					SET @resultado = 2 --
				END
				ELSE 
					BEGIN 
					SET @resultado = 1 --
				END
            -- Actualización exitosa
        END

        ELSE
        BEGIN
            SET @resultado = 0 -- Error al actualizar
        END
    END
END


GO
/****** Object:  StoredProcedure [dbo].[sp_eliminarCursosDisponibles]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[sp_eliminarCursosDisponibles]
    @idCursoDispobible INT,  -- Corregido nombre del parámetro
    @resultado INT OUTPUT
AS
BEGIN
    -- Verificamos si el curso existe
    IF NOT EXISTS (SELECT 1 FROM cursosDisponibles WHERE idCursoDispobible = @idCursoDispobible)
    BEGIN
        SET @resultado = -1 -- No existe el curso
        RETURN; -- Salimos si no existe el curso
    END

    -- Declaramos variables para estado y fecha de inicio
    DECLARE @estado CHAR(1)
    DECLARE @fechaInicio DATETIME -- Especificamos el tipo de dato

    -- Obtenemos el estado y la fecha de inicio
    SELECT @estado = estado, @fechaInicio = fechaInicio
    FROM cursosDisponibles
    WHERE idCursoDispobible = @idCursoDispobible

    -- Verificamos el estado actual y la fecha
    IF (@estado = 'A')
    BEGIN
        SET @estado = 'I' -- Si está activo, lo pasamos a inactivo
    END
    ELSE IF (@estado = 'I' AND CAST(@fechaInicio AS DATE) >= CAST(GETDATE() AS DATE))
    BEGIN
        SET @estado = 'F' -- Si está inactivo pero la fecha de inicio es futura, lo forzamos a activo
    END
    ELSE  
    BEGIN
        SET @estado = 'I' -- En cualquier otro caso, lo pasamos a inactivo
    END

    -- Actualizamos el estado en la tabla
    UPDATE cursosDisponibles
    SET estado = @estado
    WHERE idCursoDispobible = @idCursoDispobible

    -- Verificamos si la actualización fue exitosa
    IF @@ROWCOUNT > 0 
    BEGIN
        IF (@estado = 'A')
        BEGIN
            SET @resultado = 2 -- Curso activo
        END
        ELSE IF (@estado = 'F')
        BEGIN
            SET @resultado = 1 -- Curso forzado activo
        END
        ELSE
        BEGIN
            SET @resultado = 3 -- Curso inactivo
        END
    END
    ELSE
    BEGIN
        SET @resultado = 0 -- Error al actualizar
    END
END
GO
/****** Object:  StoredProcedure [dbo].[sp_eliminarDiscapacidades]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[sp_eliminarDiscapacidades]
	@idDiscapacidad INT,
    @resultado INT OUTPUT
AS
BEGIN

    -- Verificamos si el rol existe
    IF NOT EXISTS (SELECT 1 FROM discapacidades WHERE idDiscapacidad = @idDiscapacidad)
    BEGIN
        SET @resultado = -1 -- No existe el rol
    END
    ELSE
    BEGIN
	DECLARE @estado char(1)
	select @estado = estado from discapacidades   WHERE idDiscapacidad = idDiscapacidad
	IF(@estado = 'A')
	BEGIN 
		SET @estado = 'I'
	END
	ELSE 
		BEGIN 
		SET @estado = 'A'
	END
        -- Actualizamos el rol
        UPDATE discapacidades
        SET estado = @estado
        WHERE idDiscapacidad = @idDiscapacidad

        IF @@ROWCOUNT > 0 
        BEGIN
			IF(@estado = 'A')
				BEGIN 
					SET @resultado = 2 --
				END
				ELSE 
					BEGIN 
					SET @resultado = 1 --
				END
            -- Actualización exitosa
        END

        ELSE
        BEGIN
            SET @resultado = 0 -- Error al actualizar
        END
    END
END


GO
/****** Object:  StoredProcedure [dbo].[sp_eliminarGrupoEtnico]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[sp_eliminarGrupoEtnico]
	@idGrupo INT,
    @resultado INT OUTPUT
AS
BEGIN

    -- Verificamos si el rol existe
    IF NOT EXISTS (SELECT 1 FROM grupoEtnico WHERE idGrupo = @idGrupo)
    BEGIN
        SET @resultado = -1 -- No existe el rol
    END
    ELSE
    BEGIN
	DECLARE @estado char(1)
	select @estado = estado from grupoEtnico   WHERE idGrupo = @idGrupo
	IF(@estado = 'A')
	BEGIN 
		SET @estado = 'I'
	END
	ELSE 
		BEGIN 
		SET @estado = 'A'
	END
        -- Actualizamos el rol
        UPDATE grupoEtnico
        SET estado = @estado
        WHERE idGrupo = @idGrupo

        IF @@ROWCOUNT > 0 
        BEGIN
			IF(@estado = 'A')
				BEGIN 
					SET @resultado = 2 --
				END
				ELSE 
					BEGIN 
					SET @resultado = 1 --
				END
            -- Actualización exitosa
        END

        ELSE
        BEGIN
            SET @resultado = 0 -- Error al actualizar
        END
    END
END


GO
/****** Object:  StoredProcedure [dbo].[sp_eliminarHorario]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[sp_eliminarHorario]
	@idHorario INT,
    @resultado INT OUTPUT
AS
BEGIN

    -- Verificamos si el rol existe
    IF NOT EXISTS (SELECT 1 FROM horarios WHERE idHorario = @idHorario)
    BEGIN
        SET @resultado = -1 -- No existe el rol
    END
    ELSE
    BEGIN
	DECLARE @estado char(1)
	select @estado = estado from horarios   WHERE idHorario = @idHorario
	IF(@estado = 'A')
	BEGIN 
		SET @estado = 'I'
	END
	ELSE 
		BEGIN 
		SET @estado = 'A'
	END
        -- Actualizamos el rol
        UPDATE horarios
        SET estado = @estado
        WHERE idHorario = @idHorario

        IF @@ROWCOUNT > 0 
        BEGIN
			IF(@estado = 'A')
				BEGIN 
					SET @resultado = 2 --
				END
				ELSE 
					BEGIN 
					SET @resultado = 1 --
				END
            -- Actualización exitosa
        END

        ELSE
        BEGIN
            SET @resultado = 0 -- Error al actualizar
        END
    END
END


GO
/****** Object:  StoredProcedure [dbo].[sp_eliminarNivel]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[sp_eliminarNivel]
	@idNivel INT,
    @resultado INT OUTPUT
AS
BEGIN

    -- Verificamos si el rol existe
    IF NOT EXISTS (SELECT 1 FROM niveles WHERE idNivel = @idNivel)
    BEGIN
        SET @resultado = -1 -- No existe el rol
    END
    ELSE
    BEGIN
	DECLARE @estado char(1)
	select @estado = estado from niveles   WHERE idNivel = @idNivel
	IF(@estado = 'A')
	BEGIN 
		SET @estado = 'I'
	END
	ELSE 
		BEGIN 
		SET @estado = 'A'
	END
        -- Actualizamos el rol
        UPDATE niveles
        SET estado = @estado
        WHERE idNivel = @idNivel

        IF @@ROWCOUNT > 0 
        BEGIN
			IF(@estado = 'A')
				BEGIN 
					SET @resultado = 2 --
				END
				ELSE 
					BEGIN 
					SET @resultado = 1 --
				END
            -- Actualización exitosa
        END

        ELSE
        BEGIN
            SET @resultado = 0 -- Error al actualizar
        END
    END
END



GO
/****** Object:  StoredProcedure [dbo].[sp_eliminarPersona]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[sp_eliminarPersona]
    @CUI NVARCHAR(60),
    @resultado INT OUTPUT
AS
BEGIN
	    -- Verificamos si la persona existe
    IF NOT EXISTS (SELECT 1 FROM personas WHERE CUI = @CUI)
    BEGIN
        SET @resultado = -1 -- No existe la persona
    END
    ELSE
    BEGIN
	DECLARE @estado char(1)
	select @estado = estado from personas   WHERE cui = @CUI
	IF(@estado = 'A')
	BEGIN 
		SET @estado = 'I'
	END
	ELSE 
		BEGIN 
		SET @estado = 'A'
	END
        -- Actualizamos la persona
        UPDATE personas
        SET estado = @estado
        WHERE cui = @CUI

        IF @@ROWCOUNT > 0 
        BEGIN
			IF(@estado = 'A')
				BEGIN 
					SET @resultado = 2 --
				END
				ELSE 
					BEGIN 
					SET @resultado = 1 --
				END
            -- Actualización exitosa
        END

        ELSE
        BEGIN
            SET @resultado = 0 -- Error al actualizar
        END
    END

END
GO
/****** Object:  StoredProcedure [dbo].[sp_eliminarRol]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROC [dbo].[sp_eliminarRol]
    @idRol INT,
    @resultado INT OUTPUT
AS
BEGIN
    -- Verificamos si el rol existe
    IF NOT EXISTS (SELECT 1 FROM roles WHERE idRol = @idRol)
    BEGIN
        SET @resultado = -1 -- No existe el rol
    END
    ELSE
    BEGIN
        -- Eliminamos el rol
        DELETE FROM roles
        WHERE idRol = @idRol

        IF @@ROWCOUNT > 0
        BEGIN
            SET @resultado = 1 -- Eliminación exitosa
        END
        ELSE
        BEGIN
            SET @resultado = 0 -- Error al eliminar
        END
    END
END
GO
/****** Object:  StoredProcedure [dbo].[sp_eliminarSecciones]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[sp_eliminarSecciones]
	@idSeccion INT,
    @resultado INT OUTPUT
AS
BEGIN

    -- Verificamos si el rol existe
    IF NOT EXISTS (SELECT 1 FROM secciones WHERE idSeccion = @idSeccion)
    BEGIN
        SET @resultado = -1 -- No existe el rol
    END
    ELSE
    BEGIN
	DECLARE @estado char(1)
	select @estado = estado from secciones   WHERE idSeccion = @idSeccion
	IF(@estado = 'A')
	BEGIN 
		SET @estado = 'I'
	END
	ELSE 
		BEGIN 
		SET @estado = 'A'
	END
        -- Actualizamos el rol
        UPDATE secciones
        SET estado = @estado
        WHERE idSeccion = @idSeccion

        IF @@ROWCOUNT > 0 
        BEGIN
			IF(@estado = 'A')
				BEGIN 
					SET @resultado = 2 --
				END
				ELSE 
					BEGIN 
					SET @resultado = 1 --
				END
            -- Actualización exitosa
        END

        ELSE
        BEGIN
            SET @resultado = 0 -- Error al actualizar
        END
    END
END



GO
/****** Object:  StoredProcedure [dbo].[sp_eliminarSistemaDePago]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[sp_eliminarSistemaDePago]
	@idSistemaPago INT,
    @resultado INT OUTPUT
AS
BEGIN

    -- Verificamos si el rol existe
    IF NOT EXISTS (SELECT 1 FROM SistemaDePago WHERE idSistemaPago = @idSistemaPago)
    BEGIN
        SET @resultado = -1 -- No existe el rol
    END
    ELSE
    BEGIN
	DECLARE @estado char(1)
	select @estado = estado from SistemaDePago   WHERE idSistemaPago = @idSistemaPago
	IF(@estado = 'A')
	BEGIN 
		SET @estado = 'I'
	END
	ELSE 
		BEGIN 
		SET @estado = 'A'
	END
        -- Actualizamos el rol
        UPDATE SistemaDePago
        SET estado = @estado
        WHERE idSistemaPago = @idSistemaPago

        IF @@ROWCOUNT > 0 
        BEGIN
			IF(@estado = 'A')
				BEGIN 
					SET @resultado = 2 --
				END
				ELSE 
					BEGIN 
					SET @resultado = 1 --
				END
            -- Actualización exitosa
        END

        ELSE
        BEGIN
            SET @resultado = 0 -- Error al actualizar
        END
    END
END



GO
/****** Object:  StoredProcedure [dbo].[sp_eliminarTipocalificacion]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[sp_eliminarTipocalificacion]
	@idTipoCalificacion INT,
    @resultado INT OUTPUT
AS
BEGIN

    -- Verificamos si el rol existe
    IF NOT EXISTS (SELECT 1 FROM Tipocalificacion WHERE idTipoCalificacion = @idTipoCalificacion)
    BEGIN
        SET @resultado = -1 -- No existe el rol
    END
    ELSE
    BEGIN
	DECLARE @estado char(1)
	select @estado = estado from Tipocalificacion   WHERE idTipoCalificacion = @idTipoCalificacion
	IF(@estado = 'A')
	BEGIN 
		SET @estado = 'I'
	END
	ELSE 
		BEGIN 
		SET @estado = 'A'
	END
        -- Actualizamos el rol
        UPDATE Tipocalificacion
        SET estado = @estado
        WHERE idTipoCalificacion = @idTipoCalificacion

        IF @@ROWCOUNT > 0 
        BEGIN
			IF(@estado = 'A')
				BEGIN 
					SET @resultado = 2 --
				END
				ELSE 
					BEGIN 
					SET @resultado = 1 --
				END
            -- Actualización exitosa
        END

        ELSE
        BEGIN
            SET @resultado = 0 -- Error al actualizar
        END
    END
END



GO
/****** Object:  StoredProcedure [dbo].[sp_eliminarTipoEscala]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[sp_eliminarTipoEscala]
	@idTipoEscala INT,
    @resultado INT OUTPUT
AS
BEGIN

    -- Verificamos si el rol existe
    IF NOT EXISTS (SELECT 1 FROM tipoEscala WHERE ididTipoEscala = @idTipoEscala)
    BEGIN
        SET @resultado = -1 -- No existe el rol
    END
    ELSE
    BEGIN
	DECLARE @estado char(1)
	select @estado = estado from tipoEscala   WHERE ididTipoEscala = @idTipoEscala
	IF(@estado = 'A')
	BEGIN 
		SET @estado = 'I'
	END
	ELSE 
		BEGIN 
		SET @estado = 'A'
	END
        -- Actualizamos el rol
        UPDATE tipoEscala
        SET estado = @estado
        WHERE ididTipoEscala = @idTipoEscala

        IF @@ROWCOUNT > 0 
        BEGIN
			IF(@estado = 'A')
				BEGIN 
					SET @resultado = 2 --
				END
				ELSE 
					BEGIN 
					SET @resultado = 1 --
				END
            -- Actualización exitosa
        END

        ELSE
        BEGIN
            SET @resultado = 0 -- Error al actualizar
        END
    END
END


GO
/****** Object:  StoredProcedure [dbo].[sp_eliminarTipoNivel]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[sp_eliminarTipoNivel]
	@idTipoDoc INT,
    @resultado INT OUTPUT
AS
BEGIN

    -- Verificamos si el rol existe
    IF NOT EXISTS (SELECT 1 FROM tipoDocumento WHERE idTipoDoc = @idTipoDoc)
    BEGIN
        SET @resultado = -1 -- No existe el rol
    END
    ELSE
    BEGIN
	DECLARE @estado char(1)
	select @estado = estado from tipoDocumento   WHERE idTipoDoc = @idTipoDoc
	IF(@estado = 'A')
	BEGIN 
		SET @estado = 'I'
	END
	ELSE 
		BEGIN 
		SET @estado = 'A'
	END
        -- Actualizamos el rol
        UPDATE tipoDocumento
        SET estado = @estado
        WHERE idTipoDoc = @idTipoDoc

        IF @@ROWCOUNT > 0 
        BEGIN
			IF(@estado = 'A')
				BEGIN 
					SET @resultado = 2 --
				END
				ELSE 
					BEGIN 
					SET @resultado = 1 --
				END
            -- Actualización exitosa
        END

        ELSE
        BEGIN
            SET @resultado = 0 -- Error al actualizar
        END
    END
END



GO
/****** Object:  StoredProcedure [dbo].[sp_eliminarTipoTarea]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[sp_eliminarTipoTarea]
	@idTipoTarea INT,
    @resultado INT OUTPUT
AS
BEGIN

    -- Verificamos si el rol existe
    IF NOT EXISTS (SELECT 1 FROM tipoTarea WHERE idTipoTarea = @idTipoTarea)
    BEGIN
        SET @resultado = -1 -- No existe el rol
    END
    ELSE
    BEGIN
	DECLARE @estado char(1)
	select @estado = estado from tipoTarea   WHERE idTipoTarea = @idTipoTarea
	IF(@estado = 'A')
	BEGIN 
		SET @estado = 'I'
	END
	ELSE 
		BEGIN 
		SET @estado = 'A'
	END
        -- Actualizamos el rol
        UPDATE tipoTarea
        SET estado = @estado
        WHERE idTipoTarea = @idTipoTarea

        IF @@ROWCOUNT > 0 
        BEGIN
			IF(@estado = 'A')
				BEGIN 
					SET @resultado = 2 --
				END
				ELSE 
					BEGIN 
					SET @resultado = 1 --
				END
            -- Actualización exitosa
        END

        ELSE
        BEGIN
            SET @resultado = 0 -- Error al actualizar
        END
    END
END



GO
/****** Object:  StoredProcedure [dbo].[sp_insertarAlumnoYPago]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[sp_insertarAlumnoYPago]
    @cui NVARCHAR(30),
    @idHorario INT,
    @residenteLocal CHAR(1),
    @idTipoDoc INT,
    @idGrupoEtnico INT,
    @discapacidad CHAR(1),
    @idDiscapacidad INT,
    @esColaborador CHAR(1),
    @areaDeTrabajo NVARCHAR(255),
    @imgDPI NVARCHAR(2024),
    @idSistemaPago INT,
    @idCurso INT,
    --@idCicloEscolar INT,
    @fechaPago DATETIME,
    @montoPago DECIMAL(18, 0),
    @nombreCuentaOrigen NVARCHAR(255),
    @relacionInscrito NVARCHAR(100),
    @nit NVARCHAR(15),
    @nombreNit NVARCHAR(255),
    @direccionNit NVARCHAR(300),
    @numeroAutorizacion NVARCHAR(100),
    @imgTransferencia NVARCHAR(2024),
    @idPago INT OUTPUT -- Parámetro de salida para devolver 
AS
BEGIN
    BEGIN TRY
        -- Iniciar transacción
        BEGIN TRANSACTION;

        -- Verificamos si el número de autorización o el NIT ya existen en la tabla pagos
        IF EXISTS (SELECT 1 FROM pagos WHERE numeroAutorizacion = @numeroAutorizacion)
        BEGIN
            SET @idPago = -1 -- Número de autorización ya existe, devolvemos -1
            ROLLBACK TRANSACTION; -- Revertimos la transacción
            RETURN; -- Salimos del procedimiento
        END

        -- Insertamos el nuevo pago en la tabla pagos
        INSERT INTO pagos (
            fechaPago, montoPago, nombreCuentaOrigen, relacionInscrito, nit, 
            nombreNit, direccionNit, numeroAutorizacion, imgTransferencia, idSistemaPago
        )
        VALUES (
            @fechaPago, @montoPago, @nombreCuentaOrigen, @relacionInscrito, @nit, 
            @nombreNit, @direccionNit, @numeroAutorizacion, @imgTransferencia, @idSistemaPago
        );

        -- Verificamos si la inserción fue exitosa
        IF @@ROWCOUNT > 0
        BEGIN
            -- Obtenemos el idPago recién insertado
            SET @idPago = SCOPE_IDENTITY(); -- Devuelve el ID de la inserción en pagos
        END
        ELSE
        BEGIN
            SET @idPago = 0; -- Error al insertar el pago
            ROLLBACK TRANSACTION; -- Revertimos la transacción
            RETURN;
        END

        -- Insertamos el nuevo alumno en la tabla alumnos usando el idPago generado
        INSERT INTO alumnos (
            cui, idHorario, residenteLocal, idTipoDoc, idGrupoEtnico, discapacidad, 
            idDiscapacidad, esColaborador, areaDeTrabajo, imgDPI, idSistemaPago, idPago, idCurso, idCicloEscolar
        )
        VALUES (
            @cui, @idHorario, @residenteLocal, @idTipoDoc, @idGrupoEtnico, @discapacidad, 
            @idDiscapacidad, @esColaborador, @areaDeTrabajo, @imgDPI, @idSistemaPago, @idPago, @idCurso, (select top 1 idCicloEscolar from cicloEscolar WHERE estado ='A')
        );

        -- Verificamos si la inserción fue exitosa
        IF @@ROWCOUNT > 0
        BEGIN
            -- Confirmamos la transacción
            COMMIT TRANSACTION;
        END
        ELSE
        BEGIN
            -- Error al insertar el alumno
            SET @idPago = -2; -- Indicamos un error en la inserción del alumno
            ROLLBACK TRANSACTION;
        END

    END TRY
    BEGIN CATCH
        -- En caso de error, revertimos la transacción
        ROLLBACK TRANSACTION;
        SET @idPago = -99; -- Código de error genérico
        THROW; -- Lanza el error para mayor depuración
    END CATCH
END


GO
/****** Object:  StoredProcedure [dbo].[sp_insertarAsignacionDeCurso]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[sp_insertarAsignacionDeCurso]  
    @cui NVARCHAR(30),  
    @idCurso INT,  
    @idRol INT,  
    @idHorario INT,  
    @idSeccion INT,  
    @resultado INT OUTPUT  
AS  
BEGIN  
    -- Verificar si ya existe una asignación idéntica
    IF EXISTS (SELECT 1 
               FROM asignacionDeCursos 
               WHERE cui = @cui 
                 AND idCurso = @idCurso 
                 AND idRol = @idRol 
                 AND idHorario = @idHorario 
                 AND idSeccion = @idSeccion 
                 AND idCicloEscolar = (select top 1  idCicloEscolar from cicloEscolar where estado = 'A')  )
    BEGIN  
        SET @resultado = -1 -- Registro duplicado  
    END  
	  else  IF EXISTS (SELECT 1 
               FROM asignacionDeCursos 
               WHERE cui = @cui 
                 AND idRol = 3 
                 AND idCicloEscolar = (select top 1  idCicloEscolar from cicloEscolar where estado = 'A')  )
    BEGIN  
        SET @resultado = -1 -- Registro duplicado  
    END  
    ELSE  
    BEGIN  
        -- Insertar el nuevo registro en asignacionDeCursos
        INSERT INTO asignacionDeCursos (cui, idCurso, idRol, idHorario, idSeccion, idCicloEscolar)  
        VALUES (@cui, @idCurso, @idRol, @idHorario, @idSeccion, (select top 1  idCicloEscolar from cicloEscolar where estado = 'A')  )  

        -- Verificar si la inserción fue exitosa
        IF @@ROWCOUNT > 0  
        BEGIN  
            SET @resultado = 1 -- Inserción exitosa  
        END  
        ELSE  
        BEGIN  
            SET @resultado = 0 -- Error al insertar  
        END  
    END  
END  

GO
/****** Object:  StoredProcedure [dbo].[sp_InsertarAsignacionesMasivas]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_InsertarAsignacionesMasivas]
    @MaxAsignacionesPorSeccion INT
AS
BEGIN
    DECLARE @idCicloEscolar INT;
    
    -- Obtener el ciclo escolar activo
    SELECT TOP 1 @idCicloEscolar = idCicloEscolar 
    FROM cicloEscolar 
    WHERE estado = 'A';
    
    -- Validar que haya un ciclo escolar activo
    IF @idCicloEscolar IS NULL
    BEGIN
        RAISERROR('No existe un ciclo escolar activo.', 16, 1);
        RETURN;
    END;

    -- Obtener todos los alumnos sin asignación en el ciclo escolar activo
    DECLARE @AlumnosSinAsignacion TABLE 
        (cui NVARCHAR(50),
        idCurso INT,
        idHorario INT);

    INSERT INTO @AlumnosSinAsignacion (cui, idCurso, idHorario)
    SELECT a.cui, a.idCurso, a.idHorario
    FROM alumnos a
	INNER JOIN personas p on p.CUI = a.cui
    LEFT JOIN asignacionDeCursos asg ON asg.cui = a.cui AND asg.idCicloEscolar = @idCicloEscolar
    WHERE asg.cui IS NULL 
      AND a.idCicloEscolar = @idCicloEscolar
      AND a.estado = 1
	  AND p.estado='A'
	  and p.idRol = 3;

    -- Declarar la tabla para los alumnos a asignar
    DECLARE @AlumnosPorAsignar TABLE (cui NVARCHAR(50));

    -- Recorrer cada curso y horario
    DECLARE @idCurso INT, @idHorario INT, @idSeccion INT, @AsignadosPorSeccion INT;
    DECLARE SeccionesCursor CURSOR FOR
    SELECT DISTINCT s.idCurso, s.idHorario, s.idSeccion
    FROM secciones s;

    OPEN SeccionesCursor;
    FETCH NEXT FROM SeccionesCursor INTO @idCurso, @idHorario, @idSeccion;

    WHILE @@FETCH_STATUS = 0
    BEGIN
        -- Contar el número de alumnos ya asignados a la sección
        SELECT @AsignadosPorSeccion = COUNT(*)
        FROM asignacionDeCursos
        WHERE idSeccion = @idSeccion AND idCurso = @idCurso AND idHorario = @idHorario;

        -- Insertar alumnos hasta que se llene la capacidad de la sección
        IF @AsignadosPorSeccion < @MaxAsignacionesPorSeccion
        BEGIN
            -- Limpiar la tabla de alumnos a asignar antes de llenarla en cada iteración
            DELETE FROM @AlumnosPorAsignar;

            -- Seleccionar alumnos que faltan por asignar para la capacidad de la sección
            INSERT INTO @AlumnosPorAsignar (cui)
            SELECT TOP (@MaxAsignacionesPorSeccion - @AsignadosPorSeccion) cui
            FROM @AlumnosSinAsignacion
            WHERE idCurso = @idCurso AND idHorario = @idHorario;

            -- Realizar la inserción en asignaciones
            INSERT INTO asignacionDeCursos (cui, idCurso, idRol, idHorario, idSeccion, idCicloEscolar, estado)
            SELECT a.cui, @idCurso, 3 AS idRol, @idHorario, @idSeccion, @idCicloEscolar, 'A'
            FROM @AlumnosPorAsignar a;

            -- Remover alumnos asignados de la tabla temporal
            DELETE FROM @AlumnosSinAsignacion
            WHERE cui IN (SELECT cui FROM @AlumnosPorAsignar);
        END;

        FETCH NEXT FROM SeccionesCursor INTO @idCurso, @idHorario, @idSeccion;
    END;

    CLOSE SeccionesCursor;
    DEALLOCATE SeccionesCursor;
END;


--exec sp_InsertarAsignacionesMasivas 3
GO
/****** Object:  StoredProcedure [dbo].[sp_insertarCicloEscolar]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[sp_insertarCicloEscolar]
	@descripcion nvarchar(300),
    @fecharInicio date,
    @fechaFin date,
    @resultado INT OUTPUT
AS
BEGIN
    -- Verificamos si ya existe un ciclo con el mismo nombre
    IF EXISTS (SELECT 1 FROM cicloEscolar WHERE descripcion = @descripcion)
    BEGIN
        SET @resultado = -1 -- Ya existe el ciclo
    END
    ELSE
    BEGIN
        -- Insertamos el nuevo ciclo
		UPDATE cicloEscolar SET estado = 'I'
INSERT INTO [dbo].[cicloEscolar]
           ([descripcion]
           ,[fecharInicio]
           ,[fechaFin]
           ,[anio]
           ,[estado])
     VALUES
	    (@descripcion,
          @fecharInicio,
          @fechaFin, 
         year (GETDATE()), 
         'A')

        IF @@ROWCOUNT > 0
        BEGIN
            SET @resultado = 1 -- Inserción exitosa
        END
        ELSE
        BEGIN
            SET @resultado = 0 -- Error al insertar
        END
    END
END


GO
/****** Object:  StoredProcedure [dbo].[sp_insertarCursos]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[sp_insertarCursos]
	@nombreCurso NVARCHAR(500),
    @descripcionCurso NVARCHAR(1000),
	@idNivel int, 
    @resultado INT OUTPUT
AS
BEGIN
    -- Verificamos si ya existe un rol con el mismo nombre
    IF EXISTS (SELECT 1 FROM cursos WHERE nombreCurso = @nombreCurso)
    BEGIN
        SET @resultado = -1 -- Ya existe el nivel
    END
    ELSE
    BEGIN
        -- Insertamos el nuevo rol
        INSERT INTO cursos
        VALUES (
		--(SELECT ISNULL(max(idTipoDoc),0)+1  FROM tipoDocumento),
		@nombreCurso,@descripcionCurso,  'A', @idNivel)

        IF @@ROWCOUNT > 0
        BEGIN
            SET @resultado = 1 -- Inserción exitosa
        END
        ELSE
        BEGIN
            SET @resultado = 0 -- Error al insertar
        END
    END
END





GO
/****** Object:  StoredProcedure [dbo].[sp_insertarCursosDisponibles]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[sp_insertarCursosDisponibles]
	@idCurso INT,
	@requisito INT,
	@fechaInicio DATE,
    @resultado INT OUTPUT
AS
BEGIN
    -- Verificamos si ya existe un rol con el mismo nombre
    IF  EXISTS (SELECT 1 FROM cursosDisponibles WHERE idCurso = @idCurso and requisito = @requisito)
    BEGIN
        SET @resultado = -1 -- Ya existe el nivel
    END
    ELSE
    BEGIN
        -- Insertamos el nuevo rol
        INSERT INTO cursosDisponibles
        VALUES (
		--(SELECT ISNULL(max(idTipoDoc),0)+1  FROM tipoDocumento),
		@idCurso,@requisito,@fechaInicio,  'A')

        IF @@ROWCOUNT > 0
        BEGIN
            SET @resultado = 1 -- Inserción exitosa
        END
        ELSE
        BEGIN
            SET @resultado = 0 -- Error al insertar
        END
    END
END






GO
/****** Object:  StoredProcedure [dbo].[sp_insertarDiscapacidades]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[sp_insertarDiscapacidades]
	@nombre NVARCHAR(500),
    @descripcion NVARCHAR(1000),
    @resultado INT OUTPUT
AS
BEGIN
    -- Verificamos si ya existe un rol con el mismo nombre
    IF EXISTS (SELECT 1 FROM discapacidades WHERE nombre = @nombre)
    BEGIN
        SET @resultado = -1 -- Ya existe el nivel
    END
    ELSE
    BEGIN
        -- Insertamos el nuevo rol
        INSERT INTO discapacidades
        VALUES (
		--(SELECT ISNULL(max(idTipoDoc),0)+1  FROM tipoDocumento),
		@nombre, @descripcion,  'A')

        IF @@ROWCOUNT > 0
        BEGIN
            SET @resultado = 1 -- Inserción exitosa
        END
        ELSE
        BEGIN
            SET @resultado = 0 -- Error al insertar
        END
    END
END







GO
/****** Object:  StoredProcedure [dbo].[sp_insertarGrupoEtnico]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[sp_insertarGrupoEtnico]
	@nombreGrupo NVARCHAR(500),
    @descripcion NVARCHAR(1000),
    @resultado INT OUTPUT
AS
BEGIN
    -- Verificamos si ya existe un rol con el mismo nombre
    IF EXISTS (SELECT 1 FROM grupoEtnico WHERE nombreGrupo = @nombreGrupo)
    BEGIN
        SET @resultado = -1 -- Ya existe el nivel
    END
    ELSE
    BEGIN
        -- Insertamos el nuevo rol
        INSERT INTO grupoEtnico
        VALUES (
		--(SELECT ISNULL(max(idTipoDoc),0)+1  FROM tipoDocumento),
		@nombreGrupo, @descripcion,  'A')

        IF @@ROWCOUNT > 0
        BEGIN
            SET @resultado = 1 -- Inserción exitosa
        END
        ELSE
        BEGIN
            SET @resultado = 0 -- Error al insertar
        END
    END
END






GO
/****** Object:  StoredProcedure [dbo].[sp_insertarHorario]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[sp_insertarHorario]
	@horario NVARCHAR(200),
    @descripcion NVARCHAR(600),
	@idCurso int, 
    @resultado INT OUTPUT
AS
BEGIN
    -- Verificamos si ya existe un rol con el mismo nombre
    IF EXISTS (SELECT 1 FROM horarios WHERE horario = @horario)
    BEGIN
        SET @resultado = -1 -- Ya existe el nivel
    END
    ELSE
    BEGIN
        -- Insertamos el nuevo rol
        INSERT INTO horarios
        VALUES (
		--(SELECT ISNULL(max(idTipoDoc),0)+1  FROM tipoDocumento),
		@horario,@descripcion,  'A', @idCurso)

        IF @@ROWCOUNT > 0
        BEGIN
            SET @resultado = 1 -- Inserción exitosa
        END
        ELSE
        BEGIN
            SET @resultado = 0 -- Error al insertar
        END
    END
END





GO
/****** Object:  StoredProcedure [dbo].[sp_insertarNivel]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROC [dbo].[sp_insertarNivel]
    @nombreNivel NVARCHAR(500),
    @resultado INT OUTPUT
AS
BEGIN
    -- Verificamos si ya existe un rol con el mismo nombre
    IF EXISTS (SELECT 1 FROM niveles WHERE nombreNivel = @nombreNivel)
    BEGIN
        SET @resultado = -1 -- Ya existe el nivel
    END
    ELSE
    BEGIN
        -- Insertamos el nuevo rol
        INSERT INTO niveles
        VALUES (
		(SELECT ISNULL(max(idNivel),0)+1  FROM niveles),
		@nombreNivel, 'A')

        IF @@ROWCOUNT > 0
        BEGIN
            SET @resultado = 1 -- Inserción exitosa
        END
        ELSE
        BEGIN
            SET @resultado = 0 -- Error al insertar
        END
    END
END


GO
/****** Object:  StoredProcedure [dbo].[sp_insertarPago]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[sp_insertarPago]
    @fechaPago DATETIME,
    @montoPago DECIMAL(18, 0),
    @nombreCuentaOrigen NVARCHAR(255),
    @relacionInscrito NVARCHAR(100),
    @nit NVARCHAR(15),
    @nombreNit NVARCHAR(255),
    @direccionNit NVARCHAR(300),
    @numeroAutorizacion NVARCHAR(100),
    @imgTransferencia Nvarchar(2024),
    @idSistemaPago INT,
    @idPago INT OUTPUT -- Parámetro de salida modificado para devolver el idPago
AS
BEGIN
    -- Verificamos si el número de autorización o el NIT ya existen
    IF EXISTS (SELECT 1 FROM pagos WHERE numeroAutorizacion = @numeroAutorizacion and idSistemaPago = @idSistemaPago)
    BEGIN
        SET @idPago = -1 -- Número de autorización ya existe
    END
    ELSE
    BEGIN
        -- Insertamos el nuevo pago
        INSERT INTO pagos (
            fechaPago, montoPago, nombreCuentaOrigen, relacionInscrito, nit, nombreNit, 
            direccionNit, numeroAutorizacion, imgTransferencia, idSistemaPago
        )
        VALUES (
            @fechaPago, @montoPago, @nombreCuentaOrigen, @relacionInscrito, @nit, 
            @nombreNit, @direccionNit, @numeroAutorizacion, @imgTransferencia, @idSistemaPago
        )

        -- Si la inserción fue exitosa
        IF @@ROWCOUNT > 0
        BEGIN
            -- Obtenemos el idPago recién insertado
            SET @idPago = SCOPE_IDENTITY() -- Devuelve el ID de la inserción
        END
        ELSE
        BEGIN
            SET @idPago = 0 -- Error al insertar
        END
    END
END



GO
/****** Object:  StoredProcedure [dbo].[sp_insertarPersona]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[sp_insertarPersona]
    @CUI NVARCHAR(60),
    @primerNombre NVARCHAR(200),
    @segundoNombre NVARCHAR(600),
    @primerApellido NVARCHAR(200),
    @segundoApellido NVARCHAR(600),
    @fechaDeNacimiento DATE,
    @correo NVARCHAR(510),
    @telefono NVARCHAR(30),
    @genero CHAR(1),
    @idRol INT,
    @contrasenia NVARCHAR(4000),
    --@requiereCambio CHAR(1),
    @codigoPersonal NVARCHAR(60),
    @estado CHAR(1),
    @direccion NVARCHAR(600),
    @resultado INT OUTPUT
AS
BEGIN
    -- Verificamos si el CUI o el correo ya existen
    IF EXISTS (SELECT 1 FROM personas WHERE CUI = @CUI)
    BEGIN
        SET @resultado = -1 -- CUI ya existe
    END
    ELSE IF EXISTS (SELECT 1 FROM personas WHERE correo = @correo)
    BEGIN
        SET @resultado = -2 -- Correo ya existe
    END
    ELSE
    BEGIN
        -- Insertamos la nueva persona
        INSERT INTO personas (
            CUI, primerNombre, segundoNombre, primerApellido, segundoApellido,
            fechaDeNacimiento, correo, telefono, genero, idRol, contrasenia, 
            requiereCambio, codigoPersonal, estado, direccion
        )
        VALUES (
            @CUI, @primerNombre, @segundoNombre, @primerApellido, @segundoApellido,
            @fechaDeNacimiento, @correo, @telefono, @genero, @idRol, @contrasenia, 
            1, upper(@codigoPersonal), @estado, @direccion
        )

        IF @@ROWCOUNT > 0
        BEGIN
            SET @resultado = 1 -- Inserción exitosa
        END
        ELSE
        BEGIN
            SET @resultado = 0 -- Error al insertar
        END
    END
END
GO
/****** Object:  StoredProcedure [dbo].[sp_insertarRol]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROC [dbo].[sp_insertarRol]
    @descripcionDeRol NVARCHAR(200),
    @accesos NVARCHAR(200),
    @resultado INT OUTPUT
AS
BEGIN
    -- Verificamos si ya existe un rol con el mismo nombre
    IF EXISTS (SELECT 1 FROM roles WHERE descripcionDeRol = @descripcionDeRol)
    BEGIN
        SET @resultado = -1 -- Ya existe el rol
    END
    ELSE
    BEGIN
        -- Insertamos el nuevo rol
        INSERT INTO roles (descripcionDeRol, accesos)
        VALUES (@descripcionDeRol, @accesos)

        IF @@ROWCOUNT > 0
        BEGIN
            SET @resultado = 1 -- Inserción exitosa
        END
        ELSE
        BEGIN
            SET @resultado = 0 -- Error al insertar
        END
    END
END
GO
/****** Object:  StoredProcedure [dbo].[sp_insertarSecciones]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[sp_insertarSecciones]
	--@idSeccion INT,
	@idCurso INT, 
	@idHorario INT ,
	@descripcion NVARCHAR(200),
    @resultado INT OUTPUT
AS
BEGIN
    -- Verificamos si ya existe un rol con el mismo nombre
    IF EXISTS (SELECT 1 FROM secciones WHERE descripcion = @descripcion and idHorario = @idCurso and idHorario = @idHorario)
    BEGIN
        SET @resultado = -1 -- Ya existe el nivel
    END
    ELSE
    BEGIN
        -- Insertamos el nuevo rol
        INSERT INTO secciones
        VALUES (
		--(SELECT ISNULL(max(idTipoDoc),0)+1  FROM tipoDocumento),
		@idCurso,@idHorario,  'A', @descripcion)

        IF @@ROWCOUNT > 0
        BEGIN
            SET @resultado = 1 -- Inserción exitosa
        END
        ELSE
        BEGIN
            SET @resultado = 0 -- Error al insertar
        END
    END
END





GO
/****** Object:  StoredProcedure [dbo].[sp_insertarSistemaDePago]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[sp_insertarSistemaDePago]
    @nombre NVARCHAR(500),
	@DESCRIPCION NVARCHAR (1000),
    @resultado INT OUTPUT
AS
BEGIN
    -- Verificamos si ya existe un rol con el mismo nombre
    IF EXISTS (SELECT 1 FROM tipoDocumento WHERE nombre = @nombre)
    BEGIN
        SET @resultado = -1 -- Ya existe el nivel
    END
    ELSE
    BEGIN
        -- Insertamos el nuevo rol
        INSERT INTO SistemaDePago
        VALUES (
		--(SELECT ISNULL(max(idTipoDoc),0)+1  FROM tipoDocumento),
		@nombre, @DESCRIPCION, 'A')

        IF @@ROWCOUNT > 0
        BEGIN
            SET @resultado = 1 -- Inserción exitosa
        END
        ELSE
        BEGIN
            SET @resultado = 0 -- Error al insertar
        END
    END
END


GO
/****** Object:  StoredProcedure [dbo].[sp_InsertarTarea]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_InsertarTarea]
    @nombreTarea NVARCHAR(100),
    @descripcionTarea NVARCHAR(MAX),
    @cuiUsuarioCrea NVARCHAR(30),
    @fechaVence DATETIME,
    @idTipoTarea INT,
    @idTipoCalificacion INT,
    @puntaje NUMERIC(18,0),
    @idCurso INT,
    @idSeccion INT,
    @idHorario INT,
    @bloqueoEntrega CHAR(1),
    @idArhivosAdjuntos NVARCHAR(40),
   @numeroEvaluacion int OUTPUT,
   @insertadoCorrectamente int OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

	   SET @insertadoCorrectamente = 0

        INSERT INTO [dbo].[tareas]
            ([nombreTarea],
             [descripcionTarea],
             [cuiUsuarioCrea],
             [fechaCreacion],
             [fechaVence],
             [estado],
             [idTipoTarea],
             [idTipoCalificacion],
             [idFormatoCalificacion],
             [puntaje],
             [idCurso],
             [idSeccion],
             [idHorario],
             [bloqueoEntrega],
             [idArhivosAdjuntos])
        VALUES
            (@nombreTarea,
             @descripcionTarea,
             @cuiUsuarioCrea,
             GETDATE(),
             @fechaVence,
             'A',
             @idTipoTarea,
             @idTipoCalificacion,
             '',
             @puntaje,
             @idCurso,
             @idSeccion,
             @idHorario,
             @bloqueoEntrega,
             @idArhivosAdjuntos);


   IF @@ROWCOUNT > 0
   BEGIN
   DECLARE
		@ID INT
         SELECT @ID = SCOPE_IDENTITY()

		IF(@idTipoCalificacion=1)
		BEGIN 
			INSERT
				INTO rubrica
					(
					idTarea, 
					puntaje
					)
				VALUES
					(
					@ID,
					@puntaje
					)
			SELECT @numeroEvaluacion = SCOPE_IDENTITY()
			SET @insertadoCorrectamente = 1
		END
		ELSE IF(@idTipoCalificacion=2)
		BEGIN 
			INSERT
				INTO listaDeCotejo
					(
					idTarea, 
					puntaje
					)
				VALUES
					(
					@ID,
					@puntaje
					)
			SELECT @numeroEvaluacion = SCOPE_IDENTITY()
			SET @insertadoCorrectamente = 1
		END
		ELSE IF(@idTipoCalificacion=3)
		BEGIN 
			INSERT
				INTO escalaDeRango
					(
					idTarea, 
					puntaje
					)
				VALUES
					(
					@ID,
					@puntaje
					)
			SELECT @numeroEvaluacion = SCOPE_IDENTITY()
			SET @insertadoCorrectamente = 1
		END
		ELSE
		BEGIN
			SELECT @numeroEvaluacion = SCOPE_IDENTITY()
			SET @insertadoCorrectamente = 1
		END

		UPDATE
			tareas
			SET
			idFormatoCalificacion = @numeroEvaluacion
			WHERE idTarea = @ID

   END
END

GO
/****** Object:  StoredProcedure [dbo].[sp_insertarTipocalificacion]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[sp_insertarTipocalificacion]
    @descripcion NVARCHAR(500),
    @resultado INT OUTPUT
AS
BEGIN
    -- Verificamos si ya existe un rol con el mismo nombre
    IF EXISTS (SELECT 1 FROM Tipocalificacion WHERE descripcion = @descripcion)
    BEGIN
        SET @resultado = -1 -- Ya existe el nivel
    END
    ELSE
    BEGIN
        -- Insertamos el nuevo rol
        INSERT INTO Tipocalificacion
        VALUES (
		--(SELECT ISNULL(max(idTipoDoc),0)+1  FROM tipoDocumento),
		@descripcion,  'A')

        IF @@ROWCOUNT > 0
        BEGIN
            SET @resultado = 1 -- Inserción exitosa
        END
        ELSE
        BEGIN
            SET @resultado = 0 -- Error al insertar
        END
    END
END



select * from Tipocalificacion

GO
/****** Object:  StoredProcedure [dbo].[sp_insertarTipoDocumento]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROC [dbo].[sp_insertarTipoDocumento]
    @nombre NVARCHAR(500),
    @resultado INT OUTPUT
AS
BEGIN
    -- Verificamos si ya existe un rol con el mismo nombre
    IF EXISTS (SELECT 1 FROM tipoDocumento WHERE nombre = @nombre)
    BEGIN
        SET @resultado = -1 -- Ya existe el nivel
    END
    ELSE
    BEGIN
        -- Insertamos el nuevo rol
        INSERT INTO tipoDocumento
        VALUES (
		--(SELECT ISNULL(max(idTipoDoc),0)+1  FROM tipoDocumento),
		@nombre, 'A')

        IF @@ROWCOUNT > 0
        BEGIN
            SET @resultado = 1 -- Inserción exitosa
        END
        ELSE
        BEGIN
            SET @resultado = 0 -- Error al insertar
        END
    END
END


GO
/****** Object:  StoredProcedure [dbo].[sp_insertarTipoEscala]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[sp_insertarTipoEscala]
    @descripcion NVARCHAR(500),
    @resultado INT OUTPUT
AS
BEGIN
    -- Verificamos si ya existe un rol con el mismo nombre
    IF EXISTS (SELECT 1 FROM tipoEscala WHERE descripcion = @descripcion)
    BEGIN
        SET @resultado = -1 -- Ya existe el nivel
    END
    ELSE
    BEGIN
        -- Insertamos el nuevo rol
        INSERT INTO tipoEscala
        VALUES (
		--(SELECT ISNULL(max(idTipoDoc),0)+1  FROM tipoDocumento),
		@descripcion,  'A')

        IF @@ROWCOUNT > 0
        BEGIN
            SET @resultado = 1 -- Inserción exitosa
        END
        ELSE
        BEGIN
            SET @resultado = 0 -- Error al insertar
        END
    END
END






GO
/****** Object:  StoredProcedure [dbo].[sp_insertarTipoTarea]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[sp_insertarTipoTarea]
    @descripcion NVARCHAR(500),
    @resultado INT OUTPUT
AS
BEGIN
    -- Verificamos si ya existe un rol con el mismo nombre
    IF EXISTS (SELECT 1 FROM tipoTarea WHERE descripcion = @descripcion)
    BEGIN
        SET @resultado = -1 -- Ya existe el nivel
    END
    ELSE
    BEGIN
        -- Insertamos el nuevo rol
        INSERT INTO tipoTarea
        VALUES (
		--(SELECT ISNULL(max(idTipoDoc),0)+1  FROM tipoDocumento),
		@descripcion,  'A')

        IF @@ROWCOUNT > 0
        BEGIN
            SET @resultado = 1 -- Inserción exitosa
        END
        ELSE
        BEGIN
            SET @resultado = 0 -- Error al insertar
        END
    END
END






GO
/****** Object:  StoredProcedure [dbo].[sp_obtenerAsifnacionCursosPorCUI]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[sp_obtenerAsifnacionCursosPorCUI]  
  @CUI NVARCHAR(30)   
AS  
BEGIN  
 select 
a.idAsignacion,
a.cui,
a.idCurso,
a.idRol,
a.idHorario,
a.idSeccion,
a.idCicloEscolar,
a.estado, 
c.nombreCurso, 
h.horario, 
s.descripcion
 
 from asignacionDeCursos   a
 inner join cursos c on c.idCurso = a.idCurso
 inner join horarios h on h.idHorario = a.idHorario
 inner join secciones s on s.idSeccion = a.idSeccion
  where idRol = 2 and a.estado ='A'  
   and idCicloEscolar = (SELECT TOP 1 idCicloEscolar FROM cicloEscolar where estado='A')   
   AND CUI = @CUI   
END  

GO
/****** Object:  StoredProcedure [dbo].[sp_obtenerAsignacionesPorRol]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[sp_obtenerAsignacionesPorRol]  
    @idRol INT  
AS  
BEGIN  
    SELECT ac.idAsignacion, 
			ac.cui, 
			ac.idCurso, 
			p.primerNombre +' '+ p.segundoNombre as nombres, 
			p.primerApellido+' '+ p.segundoNombre as apellidos,
			c.nombreCurso, 
			ac.idRol, 
			ac.idHorario, 
			h.horario, 
			ac.idSeccion, 
			s.descripcion as seccion, 
			ac.idCicloEscolar, 
			ac.estado
    FROM asignacionDeCursos ac 
	inner join personas p on p.cui = ac.cui 
	inner join horarios h on h.idHorario = ac.idHorario
	inner join cursos c on ac.idCurso = c.idCurso
	inner join secciones s on s.idSeccion = ac.idSeccion
    WHERE ac.idRol = @idRol  
END  
GO
/****** Object:  StoredProcedure [dbo].[sp_obtenerContrasenia]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[sp_obtenerContrasenia]
	@cui varchar(30)
AS
BEGIN 
	SELECT contrasenia FROM personas WHERE CUI = @cui
END
GO
/****** Object:  StoredProcedure [dbo].[sp_obtenerListadoTareasPorCuiAlumno]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[sp_obtenerListadoTareasPorCuiAlumno]
 @cui nvarchar(30)
 as
 begin 
select 
t.idTarea,
t.nombreTarea,
t.descripcionTarea,
t.cuiUsuarioCrea,
t.fechaCreacion,
t.fechaVence,
t.estado,
t.idTipoTarea,
t.idTipoCalificacion,
t.idFormatoCalificacion,
t.puntaje,
t.idCurso,
t.idSeccion,
t.idHorario,
t.bloqueoEntrega,
t.idArhivosAdjuntos,
c.nombreCurso,
(
SELECT COUNT (1) FROM tareasEntregadas te WHERE te.CUIalumno = @cui AND te.idTarea = T.idTarea) AS entregada
from tareas t
inner join asignacionDeCursos a on a.idSeccion = t.idSeccion
inner join cursos c on a.idCurso = c.idCurso
where a.idRol = 3 and a.estado ='A' and a.cui = @cui
end 
GO
/****** Object:  StoredProcedure [dbo].[sp_obtenerListadoTareasPorCuiDocente]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[sp_obtenerListadoTareasPorCuiDocente]
	@cui nvarchar(30)
as
begin 

select idTarea, nombreTarea, fechaVence, puntaje, idCurso, idHorario, idSeccion,estado from tareas where cuiUsuarioCrea = @cui
end
GO
/****** Object:  StoredProcedure [dbo].[sp_rechazoInscipcion]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[sp_rechazoInscipcion]
	@idAlumno INT,
	@idPago int ,
    @resultado INT OUTPUT
AS
BEGIN

    IF NOT EXISTS (SELECT 1 FROM pagos WHERE idPago=@idPago)
    BEGIN
        SET @resultado = -1 
    END
	    IF NOT EXISTS (SELECT 1 FROM alumnos WHERE idAlumno = @idAlumno)
    BEGIN
        SET @resultado = -1 
    END
    ELSE
    BEGIN

        UPDATE alumnos
        SET estado = 0
        WHERE idAlumno = @idAlumno
		
		UPDATE pagos
        SET estado = 0
        WHERE idPago=@idPago
        IF @@ROWCOUNT > 0 
        BEGIN
					SET @resultado = 1 --

            -- Actualización exitosa
        END

        ELSE
        BEGIN
            SET @resultado = 0 
        END
    END
END


GO
/****** Object:  StoredProcedure [dbo].[sp_validarUsuario]    Script Date: 6/11/2024 11:55:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[sp_validarUsuario]

	@correo NVARCHAR(510),
	@contrasenia  varchar(max) output,
	@Nombre varchar(200) output,			
	@idRol int output,							
	@accesos varchar(40) output,
	@cui varchar(30) output,					
	@cambio int output
as

begin

		select @contrasenia = contrasenia, @cambio= isnull(requiereCambio,2),  @idRol = idRol, @Nombre = UPPER( primerNombre +' '+ primerApellido ), @cui = cui 
				from personas 
					where correo  = @correo 
					--and contrasenia = @contrasenia
			select @accesos = accesos 
				from roles 
					where idRol = @idRol


end
GO
USE [master]
GO
ALTER DATABASE [SIGERED_PRO_CIEGOS] SET  READ_WRITE 
GO
