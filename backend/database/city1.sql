--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

-- Started on 2023-07-31 11:05:40

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE postgres;
--
-- TOC entry 3390 (class 1262 OID 5)
-- Name: postgres; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';


ALTER DATABASE postgres OWNER TO postgres;

\connect postgres

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3391 (class 0 OID 0)
-- Dependencies: 3390
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- TOC entry 7 (class 2615 OID 16398)
-- Name: cityofmist; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA cityofmist;


ALTER SCHEMA cityofmist OWNER TO postgres;

--
-- TOC entry 242 (class 1255 OID 16580)
-- Name: sp_addTheme(bit, bit, bit, bit, integer, integer, integer, integer, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, integer, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, integer, bit[], character varying[], character varying[], integer, bit[], character varying[], character varying[], integer, bit[], character varying[], character varying[], integer, bit[], character varying[], character varying[], smallint[], smallint[], smallint[], smallint[]); Type: PROCEDURE; Schema: cityofmist; Owner: postgres
--

CREATE PROCEDURE cityofmist."sp_addTheme"(IN logosmythos1 bit, IN logosmythos2 bit, IN logosmythos3 bit, IN logosmythos4 bit, IN type1 integer, IN type2 integer, IN type3 integer, IN type4 integer, IN attention10 bit, IN attention20 bit, IN attention30 bit, IN attention11 bit, IN attention21 bit, IN attention31 bit, IN attention12 bit, IN attention22 bit, IN attention32 bit, IN attention13 bit, IN attention23 bit, IN attention33 bit, IN fade10 bit, IN fade20 bit, IN fade30 bit, IN fade11 bit, IN fade21 bit, IN fade31 bit, IN fade12 bit, IN fade22 bit, IN fade32 bit, IN fade13 bit, IN fade23 bit, IN fade33 bit, IN heroid integer, IN title1 character varying, IN title2 character varying, IN title3 character varying, IN title4 character varying, IN mystery1 character varying, IN mystery2 character varying, IN mystery3 character varying, IN mystery4 character varying, IN tagcount1 integer, IN burned1 bit[], IN text1 character varying[], IN questionletter1 character varying[], IN tagcount2 integer, IN burned2 bit[], IN text2 character varying[], IN questionletter2 character varying[], IN tagcount3 integer, IN burned3 bit[], IN text3 character varying[], IN questionletter3 character varying[], IN tagcount4 integer, IN burned4 bit[], IN text4 character varying[], IN questionletter4 character varying[], IN tagtype1 smallint[], IN tagtype2 smallint[], IN tagtype3 smallint[], IN tagtype4 smallint[])
    LANGUAGE plpgsql
    AS $$
DECLARE
    i INT;
    j INT;
	theme_ids integer[4];
	temp_id integer;
BEGIN
    -- Start the transaction
    BEGIN
        INSERT INTO cityofmist.theme(
            logos_mythos, theme_type, attention, fade, hero_id, theme_title, mystery)
        VALUES (logosmythos1, type1, ARRAY[attention10, attention20, attention30], ARRAY[fade10, fade20, fade30], heroid, title1, mystery1)
        RETURNING id INTO temp_id;
        theme_ids[0] := temp_id;
        
        INSERT INTO cityofmist.theme(
            logos_mythos, theme_type, attention, fade, hero_id, theme_title, mystery)
        VALUES (logosmythos2, type2, ARRAY[attention11, attention21, attention31], ARRAY[fade11, fade21, fade31], heroid, title2, mystery2)
        RETURNING id INTO temp_id;
        theme_ids[1] := temp_id;
        
        INSERT INTO cityofmist.theme(
            logos_mythos, theme_type, attention, fade, hero_id, theme_title, mystery)
        VALUES (logosmythos3, type3, ARRAY[attention12, attention22, attention32], ARRAY[fade12, fade22, fade32], heroid, title3, mystery3)
        RETURNING id INTO temp_id;
        theme_ids[2] := temp_id;
        
        INSERT INTO cityofmist.theme(
            logos_mythos, theme_type, attention, fade, hero_id, theme_title, mystery)
        VALUES (logosmythos4, type4, ARRAY[attention13, attention23, attention33], ARRAY[fade13, fade23, fade33], heroid, title4, mystery4)
        RETURNING id INTO temp_id;
        theme_ids[3] := temp_id;
        
        FOR i IN 1..4 LOOP
			FOR j IN 1..CASE i
				WHEN 1 THEN tagcount1
				WHEN 2 THEN tagcount2
				WHEN 3 THEN tagcount3
				WHEN 4 THEN tagcount4
			END LOOP
				INSERT INTO cityofmist.tag (burned, tag_type, theme_id, tag_name, letter)
				SELECT
					CASE i
						WHEN 1 THEN burned1[j]
						WHEN 2 THEN burned2[j]
						WHEN 3 THEN burned3[j]
						WHEN 4 THEN burned4[j]
					END,
					CASE i
						WHEN 1 THEN tagtype1[j]
						WHEN 2 THEN tagtype2[j]
						WHEN 3 THEN tagtype3[j]
						WHEN 4 THEN tagtype4[j]
					END,
					theme_ids[i-1],
					CASE i
						WHEN 1 THEN text1[j]
						WHEN 2 THEN text2[j]
						WHEN 3 THEN text3[j]
						WHEN 4 THEN text4[j]
					END,
					CASE i
						WHEN 1 THEN questionletter1[j]
						WHEN 2 THEN questionletter2[j]
						WHEN 3 THEN questionletter3[j]
						WHEN 4 THEN questionletter4[j]
					END
				FROM generate_series(1, 1);
			END LOOP;
		END LOOP;
        COMMIT;
    END;
END;
$$;


ALTER PROCEDURE cityofmist."sp_addTheme"(IN logosmythos1 bit, IN logosmythos2 bit, IN logosmythos3 bit, IN logosmythos4 bit, IN type1 integer, IN type2 integer, IN type3 integer, IN type4 integer, IN attention10 bit, IN attention20 bit, IN attention30 bit, IN attention11 bit, IN attention21 bit, IN attention31 bit, IN attention12 bit, IN attention22 bit, IN attention32 bit, IN attention13 bit, IN attention23 bit, IN attention33 bit, IN fade10 bit, IN fade20 bit, IN fade30 bit, IN fade11 bit, IN fade21 bit, IN fade31 bit, IN fade12 bit, IN fade22 bit, IN fade32 bit, IN fade13 bit, IN fade23 bit, IN fade33 bit, IN heroid integer, IN title1 character varying, IN title2 character varying, IN title3 character varying, IN title4 character varying, IN mystery1 character varying, IN mystery2 character varying, IN mystery3 character varying, IN mystery4 character varying, IN tagcount1 integer, IN burned1 bit[], IN text1 character varying[], IN questionletter1 character varying[], IN tagcount2 integer, IN burned2 bit[], IN text2 character varying[], IN questionletter2 character varying[], IN tagcount3 integer, IN burned3 bit[], IN text3 character varying[], IN questionletter3 character varying[], IN tagcount4 integer, IN burned4 bit[], IN text4 character varying[], IN questionletter4 character varying[], IN tagtype1 smallint[], IN tagtype2 smallint[], IN tagtype3 smallint[], IN tagtype4 smallint[]) OWNER TO postgres;

--
-- TOC entry 241 (class 1255 OID 16588)
-- Name: sp_updateTheme(bit, bit, bit, bit, integer, integer, integer, integer, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, integer, integer, integer, integer, integer, bit[], character varying[], character varying[], integer, bit[], character varying[], character varying[], integer, bit[], character varying[], character varying[], integer, bit[], character varying[], character varying[], smallint[], smallint[], smallint[], smallint[]); Type: PROCEDURE; Schema: cityofmist; Owner: postgres
--

CREATE PROCEDURE cityofmist."sp_updateTheme"(IN logosmythos1 bit, IN logosmythos2 bit, IN logosmythos3 bit, IN logosmythos4 bit, IN type1 integer, IN type2 integer, IN type3 integer, IN type4 integer, IN attention10 bit, IN attention20 bit, IN attention30 bit, IN attention11 bit, IN attention21 bit, IN attention31 bit, IN attention12 bit, IN attention22 bit, IN attention32 bit, IN attention13 bit, IN attention23 bit, IN attention33 bit, IN fade10 bit, IN fade20 bit, IN fade30 bit, IN fade11 bit, IN fade21 bit, IN fade31 bit, IN fade12 bit, IN fade22 bit, IN fade32 bit, IN fade13 bit, IN fade23 bit, IN fade33 bit, IN title1 character varying, IN title2 character varying, IN title3 character varying, IN title4 character varying, IN mystery1 character varying, IN mystery2 character varying, IN mystery3 character varying, IN mystery4 character varying, IN themeid1 integer, IN themeid2 integer, IN themeid3 integer, IN themeid4 integer, IN tagcount1 integer, IN burned1 bit[], IN text1 character varying[], IN questionletter1 character varying[], IN tagcount2 integer, IN burned2 bit[], IN text2 character varying[], IN questionletter2 character varying[], IN tagcount3 integer, IN burned3 bit[], IN text3 character varying[], IN questionletter3 character varying[], IN tagcount4 integer, IN burned4 bit[], IN text4 character varying[], IN questionletter4 character varying[], IN tagtype1 smallint[], IN tagtype2 smallint[], IN tagtype3 smallint[], IN tagtype4 smallint[])
    LANGUAGE plpgsql
    AS $$
DECLARE
    i INT;
    j INT;
BEGIN
    -- Start the transaction
    BEGIN
        UPDATE cityofmist.theme
        SET logos_mythos = CAST(LogosMythos1 AS bit),
            theme_type = Type1,
            attention = CAST(ARRAY[Attention10,Attention20,Attention30] AS bit[]),
            fade = CAST(ARRAY[Fade10,Fade20,Fade30] AS bit[]),
            theme_title = Title1,
            mystery = Mystery1
        WHERE "id" = themeid1;

        UPDATE cityofmist.theme
        SET logos_mythos = CAST(LogosMythos2 AS bit),
            theme_type = Type2,
            attention = CAST(ARRAY[Attention11,Attention21,Attention31] AS bit[]),
            fade = CAST(ARRAY[Fade11,Fade21,Fade31] AS bit[]),
            theme_title = Title2,
            mystery = Mystery2
        WHERE "id" = themeid2;

        UPDATE cityofmist.theme
        SET logos_mythos = CAST(LogosMythos3 AS bit),
            theme_type = Type3,
            attention = CAST(ARRAY[Attention12,Attention22,Attention32] AS bit[]),
            fade = CAST(ARRAY[Fade12,Fade22,Fade32] AS bit[]),
            theme_title = Title3,
            mystery = Mystery3
        WHERE "id" = themeid3;

        UPDATE cityofmist.theme
        SET logos_mythos = CAST(LogosMythos4 AS bit),
            theme_type = Type4,
            attention = CAST(ARRAY[Attention13,Attention23,Attention33] AS bit[]),
            fade = CAST(ARRAY[Fade13,Fade23,Fade33] AS bit[]),
            theme_title = Title4,
            mystery = Mystery4
        WHERE "id" = themeid4;
		
		DELETE FROM cityofmist.tag WHERE theme_id IN (themeid1, themeid2, themeid3, themeid4);
		FOR i IN 1..4 LOOP
			FOR j IN 1..CASE i
				WHEN 1 THEN tagcount1
				WHEN 2 THEN tagcount2
				WHEN 3 THEN tagcount3
				WHEN 4 THEN tagcount4
			END LOOP
				INSERT INTO cityofmist.tag (burned, tag_type, theme_id, tag_name, letter)
				SELECT
					CASE i
						WHEN 1 THEN burned1[j]
						WHEN 2 THEN burned2[j]
						WHEN 3 THEN burned3[j]
						WHEN 4 THEN burned4[j]
					END,
					CASE i
						WHEN 1 THEN tagtype1[j]
						WHEN 2 THEN tagtype2[j]
						WHEN 3 THEN tagtype3[j]
						WHEN 4 THEN tagtype4[j]
					END,
					CASE i
						WHEN 1 THEN themeid1
						WHEN 2 THEN themeid2
						WHEN 3 THEN themeid3
						WHEN 4 THEN themeid4
					END,
					CASE i
						WHEN 1 THEN text1[j]
						WHEN 2 THEN text2[j]
						WHEN 3 THEN text3[j]
						WHEN 4 THEN text4[j]
					END,
					CASE i
						WHEN 1 THEN questionletter1[j]
						WHEN 2 THEN questionletter2[j]
						WHEN 3 THEN questionletter3[j]
						WHEN 4 THEN questionletter4[j]
					END
				FROM generate_series(1, 1);
			END LOOP;
		END LOOP;
        COMMIT;
    END;
END;
$$;


ALTER PROCEDURE cityofmist."sp_updateTheme"(IN logosmythos1 bit, IN logosmythos2 bit, IN logosmythos3 bit, IN logosmythos4 bit, IN type1 integer, IN type2 integer, IN type3 integer, IN type4 integer, IN attention10 bit, IN attention20 bit, IN attention30 bit, IN attention11 bit, IN attention21 bit, IN attention31 bit, IN attention12 bit, IN attention22 bit, IN attention32 bit, IN attention13 bit, IN attention23 bit, IN attention33 bit, IN fade10 bit, IN fade20 bit, IN fade30 bit, IN fade11 bit, IN fade21 bit, IN fade31 bit, IN fade12 bit, IN fade22 bit, IN fade32 bit, IN fade13 bit, IN fade23 bit, IN fade33 bit, IN title1 character varying, IN title2 character varying, IN title3 character varying, IN title4 character varying, IN mystery1 character varying, IN mystery2 character varying, IN mystery3 character varying, IN mystery4 character varying, IN themeid1 integer, IN themeid2 integer, IN themeid3 integer, IN themeid4 integer, IN tagcount1 integer, IN burned1 bit[], IN text1 character varying[], IN questionletter1 character varying[], IN tagcount2 integer, IN burned2 bit[], IN text2 character varying[], IN questionletter2 character varying[], IN tagcount3 integer, IN burned3 bit[], IN text3 character varying[], IN questionletter3 character varying[], IN tagcount4 integer, IN burned4 bit[], IN text4 character varying[], IN questionletter4 character varying[], IN tagtype1 smallint[], IN tagtype2 smallint[], IN tagtype3 smallint[], IN tagtype4 smallint[]) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 16406)
-- Name: hero; Type: TABLE; Schema: cityofmist; Owner: postgres
--

CREATE TABLE cityofmist.hero (
    id integer NOT NULL,
    user_id integer,
    hero_name character varying(100),
    user_hero_subid integer
);


ALTER TABLE cityofmist.hero OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16525)
-- Name: hero_id_seq; Type: SEQUENCE; Schema: cityofmist; Owner: postgres
--

ALTER TABLE cityofmist.hero ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME cityofmist.hero_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 216 (class 1259 OID 16399)
-- Name: t_user; Type: TABLE; Schema: cityofmist; Owner: postgres
--

CREATE TABLE cityofmist.t_user (
    id integer NOT NULL,
    user_name character varying(100),
    password character varying(100)
);


ALTER TABLE cityofmist.t_user OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16475)
-- Name: t_user_ID_seq; Type: SEQUENCE; Schema: cityofmist; Owner: postgres
--

ALTER TABLE cityofmist.t_user ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME cityofmist."t_user_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 221 (class 1259 OID 16432)
-- Name: tag; Type: TABLE; Schema: cityofmist; Owner: postgres
--

CREATE TABLE cityofmist.tag (
    id integer NOT NULL,
    burned bit(1),
    tag_type smallint,
    theme_id integer,
    tag_name character varying,
    letter character varying(1)
);


ALTER TABLE cityofmist.tag OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16523)
-- Name: tag_id_seq; Type: SEQUENCE; Schema: cityofmist; Owner: postgres
--

ALTER TABLE cityofmist.tag ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME cityofmist.tag_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 218 (class 1259 OID 16413)
-- Name: theme; Type: TABLE; Schema: cityofmist; Owner: postgres
--

CREATE TABLE cityofmist.theme (
    id integer NOT NULL,
    logos_mythos bit(1),
    theme_type integer,
    attention bit(1)[],
    fade bit(1)[],
    hero_id integer,
    theme_title character varying(500),
    mystery character varying(500)
);


ALTER TABLE cityofmist.theme OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16484)
-- Name: theme_id_seq; Type: SEQUENCE; Schema: cityofmist; Owner: postgres
--

ALTER TABLE cityofmist.theme ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME cityofmist.theme_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 219 (class 1259 OID 16420)
-- Name: trick; Type: TABLE; Schema: cityofmist; Owner: postgres
--

CREATE TABLE cityofmist.trick (
    id integer NOT NULL,
    hero_id integer,
    trick_name character varying(100)
);


ALTER TABLE cityofmist.trick OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16427)
-- Name: trickTag; Type: TABLE; Schema: cityofmist; Owner: postgres
--

CREATE TABLE cityofmist."trickTag" (
    id integer NOT NULL,
    trick_id integer,
    tag_id integer
);


ALTER TABLE cityofmist."trickTag" OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16524)
-- Name: trickTag_id_seq; Type: SEQUENCE; Schema: cityofmist; Owner: postgres
--

ALTER TABLE cityofmist."trickTag" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME cityofmist."trickTag_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 224 (class 1259 OID 16485)
-- Name: trick_id_seq; Type: SEQUENCE; Schema: cityofmist; Owner: postgres
--

ALTER TABLE cityofmist.trick ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME cityofmist.trick_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 3374 (class 0 OID 16406)
-- Dependencies: 217
-- Data for Name: hero; Type: TABLE DATA; Schema: cityofmist; Owner: postgres
--

INSERT INTO cityofmist.hero (id, user_id, hero_name, user_hero_subid) OVERRIDING SYSTEM VALUE VALUES (1, 1, 'Bob', 1);
INSERT INTO cityofmist.hero (id, user_id, hero_name, user_hero_subid) OVERRIDING SYSTEM VALUE VALUES (2, 1, 'Cat', 0);
INSERT INTO cityofmist.hero (id, user_id, hero_name, user_hero_subid) OVERRIDING SYSTEM VALUE VALUES (5, 1, 'LOL', 2);


--
-- TOC entry 3373 (class 0 OID 16399)
-- Dependencies: 216
-- Data for Name: t_user; Type: TABLE DATA; Schema: cityofmist; Owner: postgres
--

INSERT INTO cityofmist.t_user (id, user_name, password) OVERRIDING SYSTEM VALUE VALUES (1, 'public', 'password');
INSERT INTO cityofmist.t_user (id, user_name, password) OVERRIDING SYSTEM VALUE VALUES (2, 'Bob', 'password');
INSERT INTO cityofmist.t_user (id, user_name, password) OVERRIDING SYSTEM VALUE VALUES (22, 'Anar', 'Anri200*');
INSERT INTO cityofmist.t_user (id, user_name, password) OVERRIDING SYSTEM VALUE VALUES (23, 'hack123', '1234');


--
-- TOC entry 3378 (class 0 OID 16432)
-- Dependencies: 221
-- Data for Name: tag; Type: TABLE DATA; Schema: cityofmist; Owner: postgres
--

INSERT INTO cityofmist.tag (id, burned, tag_type, theme_id, tag_name, letter) OVERRIDING SYSTEM VALUE VALUES (427, B'0', 1, 297, 'Cold Heads Win', '0');
INSERT INTO cityofmist.tag (id, burned, tag_type, theme_id, tag_name, letter) OVERRIDING SYSTEM VALUE VALUES (428, B'0', 1, 297, 'Aloofness', '1');
INSERT INTO cityofmist.tag (id, burned, tag_type, theme_id, tag_name, letter) OVERRIDING SYSTEM VALUE VALUES (429, B'0', 1, 297, 'Inexorable', '6');
INSERT INTO cityofmist.tag (id, burned, tag_type, theme_id, tag_name, letter) OVERRIDING SYSTEM VALUE VALUES (430, B'0', 0, 297, 'Null Social Skills', '0');
INSERT INTO cityofmist.tag (id, burned, tag_type, theme_id, tag_name, letter) OVERRIDING SYSTEM VALUE VALUES (431, B'0', 1, 298, 'Schoolboy', '0');
INSERT INTO cityofmist.tag (id, burned, tag_type, theme_id, tag_name, letter) OVERRIDING SYSTEM VALUE VALUES (432, B'0', 1, 298, 'Academic knowledge', '4');
INSERT INTO cityofmist.tag (id, burned, tag_type, theme_id, tag_name, letter) OVERRIDING SYSTEM VALUE VALUES (433, B'0', 1, 298, 'School after 9pm.', '8');
INSERT INTO cityofmist.tag (id, burned, tag_type, theme_id, tag_name, letter) OVERRIDING SYSTEM VALUE VALUES (434, B'0', 1, 298, 'Detect troublemakers', '6');
INSERT INTO cityofmist.tag (id, burned, tag_type, theme_id, tag_name, letter) OVERRIDING SYSTEM VALUE VALUES (435, B'0', 0, 298, 'Time drain', '1');
INSERT INTO cityofmist.tag (id, burned, tag_type, theme_id, tag_name, letter) OVERRIDING SYSTEM VALUE VALUES (436, B'0', 0, 298, 'Disciplinary action', '3');
INSERT INTO cityofmist.tag (id, burned, tag_type, theme_id, tag_name, letter) OVERRIDING SYSTEM VALUE VALUES (437, B'0', 1, 299, 'Telekinesis', '0');
INSERT INTO cityofmist.tag (id, burned, tag_type, theme_id, tag_name, letter) OVERRIDING SYSTEM VALUE VALUES (438, B'0', 1, 299, 'Time dilation', '2');
INSERT INTO cityofmist.tag (id, burned, tag_type, theme_id, tag_name, letter) OVERRIDING SYSTEM VALUE VALUES (439, B'0', 1, 299, 'Darkness', '3');
INSERT INTO cityofmist.tag (id, burned, tag_type, theme_id, tag_name, letter) OVERRIDING SYSTEM VALUE VALUES (440, B'0', 0, 299, 'Precise control', '1');
INSERT INTO cityofmist.tag (id, burned, tag_type, theme_id, tag_name, letter) OVERRIDING SYSTEM VALUE VALUES (441, B'0', 1, 300, 'Enough power', '0');
INSERT INTO cityofmist.tag (id, burned, tag_type, theme_id, tag_name, letter) OVERRIDING SYSTEM VALUE VALUES (442, B'0', 1, 300, 'I want home', '6');
INSERT INTO cityofmist.tag (id, burned, tag_type, theme_id, tag_name, letter) OVERRIDING SYSTEM VALUE VALUES (443, B'0', 1, 300, 'Freedom seeker', '5');
INSERT INTO cityofmist.tag (id, burned, tag_type, theme_id, tag_name, letter) OVERRIDING SYSTEM VALUE VALUES (444, B'0', 0, 300, 'City Walls', '3');
INSERT INTO cityofmist.tag (id, burned, tag_type, theme_id, tag_name, letter) OVERRIDING SYSTEM VALUE VALUES (362, B'1', 1, 293, 'p1', '0');
INSERT INTO cityofmist.tag (id, burned, tag_type, theme_id, tag_name, letter) OVERRIDING SYSTEM VALUE VALUES (363, B'0', 1, 293, 'p5', '0');
INSERT INTO cityofmist.tag (id, burned, tag_type, theme_id, tag_name, letter) OVERRIDING SYSTEM VALUE VALUES (364, B'0', 0, 293, 'w1', '0');
INSERT INTO cityofmist.tag (id, burned, tag_type, theme_id, tag_name, letter) OVERRIDING SYSTEM VALUE VALUES (365, B'0', 1, 294, 'p2', '0');
INSERT INTO cityofmist.tag (id, burned, tag_type, theme_id, tag_name, letter) OVERRIDING SYSTEM VALUE VALUES (366, B'1', 0, 294, 'w2', '0');
INSERT INTO cityofmist.tag (id, burned, tag_type, theme_id, tag_name, letter) OVERRIDING SYSTEM VALUE VALUES (367, B'0', 0, 294, 'w3', '0');
INSERT INTO cityofmist.tag (id, burned, tag_type, theme_id, tag_name, letter) OVERRIDING SYSTEM VALUE VALUES (368, B'0', 1, 295, 'p3', '0');
INSERT INTO cityofmist.tag (id, burned, tag_type, theme_id, tag_name, letter) OVERRIDING SYSTEM VALUE VALUES (369, B'0', 1, 295, 'p6', '0');
INSERT INTO cityofmist.tag (id, burned, tag_type, theme_id, tag_name, letter) OVERRIDING SYSTEM VALUE VALUES (370, B'1', 0, 295, 'w4', '0');
INSERT INTO cityofmist.tag (id, burned, tag_type, theme_id, tag_name, letter) OVERRIDING SYSTEM VALUE VALUES (371, B'0', 1, 296, 'p4', '0');
INSERT INTO cityofmist.tag (id, burned, tag_type, theme_id, tag_name, letter) OVERRIDING SYSTEM VALUE VALUES (372, B'0', 0, 296, 'w5', '0');


--
-- TOC entry 3375 (class 0 OID 16413)
-- Dependencies: 218
-- Data for Name: theme; Type: TABLE DATA; Schema: cityofmist; Owner: postgres
--

INSERT INTO cityofmist.theme (id, logos_mythos, theme_type, attention, fade, hero_id, theme_title, mystery) OVERRIDING SYSTEM VALUE VALUES (293, B'1', 2, '{0,1,0}', '{1,0,0}', 2, 'Searching for the lost', 'The People of this neighborhood deserve to know.');
INSERT INTO cityofmist.theme (id, logos_mythos, theme_type, attention, fade, hero_id, theme_title, mystery) OVERRIDING SYSTEM VALUE VALUES (294, B'1', 1, '{0,1,0}', '{1,0,0}', 2, 'Searching for the lost', 'The People of this neighborhood deserve to know.');
INSERT INTO cityofmist.theme (id, logos_mythos, theme_type, attention, fade, hero_id, theme_title, mystery) OVERRIDING SYSTEM VALUE VALUES (295, B'0', 5, '{0,0,1}', '{0,0,1}', 2, 'Searching for the lost', 'The People of this neighborhood deserve to know.');
INSERT INTO cityofmist.theme (id, logos_mythos, theme_type, attention, fade, hero_id, theme_title, mystery) OVERRIDING SYSTEM VALUE VALUES (296, B'0', 6, '{1,0,0}', '{1,0,0}', 2, 'Searching for the lost', 'The People of this neighborhood deserve to know.');
INSERT INTO cityofmist.theme (id, logos_mythos, theme_type, attention, fade, hero_id, theme_title, mystery) OVERRIDING SYSTEM VALUE VALUES (297, B'0', 4, '{0,0,0}', '{0,0,0}', 1, 'The Quiet Guy.<br>', 'Emotions never help.<br>');
INSERT INTO cityofmist.theme (id, logos_mythos, theme_type, attention, fade, hero_id, theme_title, mystery) OVERRIDING SYSTEM VALUE VALUES (298, B'0', 6, '{0,0,0}', '{0,0,0}', 1, 'School aka child prison.<br>', 'Its is as boring as my first day here.<br>');
INSERT INTO cityofmist.theme (id, logos_mythos, theme_type, attention, fade, hero_id, theme_title, mystery) OVERRIDING SYSTEM VALUE VALUES (299, B'1', 1, '{0,0,0}', '{0,0,0}', 1, 'Nuetron Star.<br>', 'Most Epic cosmic body known.<br>');
INSERT INTO cityofmist.theme (id, logos_mythos, theme_type, attention, fade, hero_id, theme_title, mystery) OVERRIDING SYSTEM VALUE VALUES (300, B'0', 3, '{0,0,0}', '{0,0,0}', 1, 'Leave the city with powers.<br>', 'I''m out of here.<br>');
INSERT INTO cityofmist.theme (id, logos_mythos, theme_type, attention, fade, hero_id, theme_title, mystery) OVERRIDING SYSTEM VALUE VALUES (301, B'0', 0, '{0,0,0}', '{0,0,0}', 5, 'Searching for the lost', 'The People of this neighborhood deserve to know.');
INSERT INTO cityofmist.theme (id, logos_mythos, theme_type, attention, fade, hero_id, theme_title, mystery) OVERRIDING SYSTEM VALUE VALUES (302, B'0', 0, '{0,0,0}', '{0,0,0}', 5, 'Searching for the lost', 'The People of this neighborhood deserve to know.');
INSERT INTO cityofmist.theme (id, logos_mythos, theme_type, attention, fade, hero_id, theme_title, mystery) OVERRIDING SYSTEM VALUE VALUES (303, B'0', 0, '{0,0,0}', '{0,0,0}', 5, 'Searching for the lost', 'The People of this neighborhood deserve to know.');
INSERT INTO cityofmist.theme (id, logos_mythos, theme_type, attention, fade, hero_id, theme_title, mystery) OVERRIDING SYSTEM VALUE VALUES (304, B'0', 0, '{0,0,0}', '{0,0,0}', 5, 'Searching for the lost', 'The People of this neighborhood deserve to know.');


--
-- TOC entry 3376 (class 0 OID 16420)
-- Dependencies: 219
-- Data for Name: trick; Type: TABLE DATA; Schema: cityofmist; Owner: postgres
--

INSERT INTO cityofmist.trick (id, hero_id, trick_name) OVERRIDING SYSTEM VALUE VALUES (1, 1, 'hop');


--
-- TOC entry 3377 (class 0 OID 16427)
-- Dependencies: 220
-- Data for Name: trickTag; Type: TABLE DATA; Schema: cityofmist; Owner: postgres
--



--
-- TOC entry 3392 (class 0 OID 0)
-- Dependencies: 227
-- Name: hero_id_seq; Type: SEQUENCE SET; Schema: cityofmist; Owner: postgres
--

SELECT pg_catalog.setval('cityofmist.hero_id_seq', 5, true);


--
-- TOC entry 3393 (class 0 OID 0)
-- Dependencies: 222
-- Name: t_user_ID_seq; Type: SEQUENCE SET; Schema: cityofmist; Owner: postgres
--

SELECT pg_catalog.setval('cityofmist."t_user_ID_seq"', 23, true);


--
-- TOC entry 3394 (class 0 OID 0)
-- Dependencies: 225
-- Name: tag_id_seq; Type: SEQUENCE SET; Schema: cityofmist; Owner: postgres
--

SELECT pg_catalog.setval('cityofmist.tag_id_seq', 444, true);


--
-- TOC entry 3395 (class 0 OID 0)
-- Dependencies: 223
-- Name: theme_id_seq; Type: SEQUENCE SET; Schema: cityofmist; Owner: postgres
--

SELECT pg_catalog.setval('cityofmist.theme_id_seq', 304, true);


--
-- TOC entry 3396 (class 0 OID 0)
-- Dependencies: 226
-- Name: trickTag_id_seq; Type: SEQUENCE SET; Schema: cityofmist; Owner: postgres
--

SELECT pg_catalog.setval('cityofmist."trickTag_id_seq"', 1, false);


--
-- TOC entry 3397 (class 0 OID 0)
-- Dependencies: 224
-- Name: trick_id_seq; Type: SEQUENCE SET; Schema: cityofmist; Owner: postgres
--

SELECT pg_catalog.setval('cityofmist.trick_id_seq', 1, true);


--
-- TOC entry 3211 (class 2606 OID 16412)
-- Name: hero hero_pkey; Type: CONSTRAINT; Schema: cityofmist; Owner: postgres
--

ALTER TABLE ONLY cityofmist.hero
    ADD CONSTRAINT hero_pkey PRIMARY KEY (id);


--
-- TOC entry 3224 (class 2606 OID 16438)
-- Name: tag tag_pkey; Type: CONSTRAINT; Schema: cityofmist; Owner: postgres
--

ALTER TABLE ONLY cityofmist.tag
    ADD CONSTRAINT tag_pkey PRIMARY KEY (id);


--
-- TOC entry 3214 (class 2606 OID 16419)
-- Name: theme theme_pkey; Type: CONSTRAINT; Schema: cityofmist; Owner: postgres
--

ALTER TABLE ONLY cityofmist.theme
    ADD CONSTRAINT theme_pkey PRIMARY KEY (id);


--
-- TOC entry 3221 (class 2606 OID 16431)
-- Name: trickTag trickTag_pkey; Type: CONSTRAINT; Schema: cityofmist; Owner: postgres
--

ALTER TABLE ONLY cityofmist."trickTag"
    ADD CONSTRAINT "trickTag_pkey" PRIMARY KEY (id);


--
-- TOC entry 3217 (class 2606 OID 16426)
-- Name: trick trick_pkey; Type: CONSTRAINT; Schema: cityofmist; Owner: postgres
--

ALTER TABLE ONLY cityofmist.trick
    ADD CONSTRAINT trick_pkey PRIMARY KEY (id);


--
-- TOC entry 3207 (class 2606 OID 16405)
-- Name: t_user user_pkey; Type: CONSTRAINT; Schema: cityofmist; Owner: postgres
--

ALTER TABLE ONLY cityofmist.t_user
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- TOC entry 3212 (class 1259 OID 16456)
-- Name: fki_h; Type: INDEX; Schema: cityofmist; Owner: postgres
--

CREATE INDEX fki_h ON cityofmist.theme USING btree (hero_id);


--
-- TOC entry 3208 (class 1259 OID 16481)
-- Name: fki_hero_key; Type: INDEX; Schema: cityofmist; Owner: postgres
--

CREATE INDEX fki_hero_key ON cityofmist.hero USING btree (user_id);


--
-- TOC entry 3215 (class 1259 OID 16462)
-- Name: fki_hero_trick; Type: INDEX; Schema: cityofmist; Owner: postgres
--

CREATE INDEX fki_hero_trick ON cityofmist.trick USING btree (hero_id);


--
-- TOC entry 3222 (class 1259 OID 16450)
-- Name: fki_theme_tag; Type: INDEX; Schema: cityofmist; Owner: postgres
--

CREATE INDEX fki_theme_tag ON cityofmist.tag USING btree (theme_id);


--
-- TOC entry 3218 (class 1259 OID 16474)
-- Name: fki_tricktag_tag; Type: INDEX; Schema: cityofmist; Owner: postgres
--

CREATE INDEX fki_tricktag_tag ON cityofmist."trickTag" USING btree (tag_id);


--
-- TOC entry 3219 (class 1259 OID 16468)
-- Name: fki_tricktag_trick; Type: INDEX; Schema: cityofmist; Owner: postgres
--

CREATE INDEX fki_tricktag_trick ON cityofmist."trickTag" USING btree (trick_id);


--
-- TOC entry 3209 (class 1259 OID 16444)
-- Name: fki_user_hero; Type: INDEX; Schema: cityofmist; Owner: postgres
--

CREATE INDEX fki_user_hero ON cityofmist.hero USING btree (user_id);


--
-- TOC entry 3227 (class 2606 OID 16457)
-- Name: trick hero_trick; Type: FK CONSTRAINT; Schema: cityofmist; Owner: postgres
--

ALTER TABLE ONLY cityofmist.trick
    ADD CONSTRAINT hero_trick FOREIGN KEY (hero_id) REFERENCES cityofmist.hero(id) NOT VALID;


--
-- TOC entry 3226 (class 2606 OID 16451)
-- Name: theme theme_hero; Type: FK CONSTRAINT; Schema: cityofmist; Owner: postgres
--

ALTER TABLE ONLY cityofmist.theme
    ADD CONSTRAINT theme_hero FOREIGN KEY (hero_id) REFERENCES cityofmist.hero(id) NOT VALID;


--
-- TOC entry 3230 (class 2606 OID 16445)
-- Name: tag theme_tag; Type: FK CONSTRAINT; Schema: cityofmist; Owner: postgres
--

ALTER TABLE ONLY cityofmist.tag
    ADD CONSTRAINT theme_tag FOREIGN KEY (theme_id) REFERENCES cityofmist.theme(id) NOT VALID;


--
-- TOC entry 3228 (class 2606 OID 16469)
-- Name: trickTag tricktag_tag; Type: FK CONSTRAINT; Schema: cityofmist; Owner: postgres
--

ALTER TABLE ONLY cityofmist."trickTag"
    ADD CONSTRAINT tricktag_tag FOREIGN KEY (tag_id) REFERENCES cityofmist.tag(id) NOT VALID;


--
-- TOC entry 3229 (class 2606 OID 16463)
-- Name: trickTag tricktag_trick; Type: FK CONSTRAINT; Schema: cityofmist; Owner: postgres
--

ALTER TABLE ONLY cityofmist."trickTag"
    ADD CONSTRAINT tricktag_trick FOREIGN KEY (trick_id) REFERENCES cityofmist.trick(id) NOT VALID;


--
-- TOC entry 3225 (class 2606 OID 16476)
-- Name: hero user_hero; Type: FK CONSTRAINT; Schema: cityofmist; Owner: postgres
--

ALTER TABLE ONLY cityofmist.hero
    ADD CONSTRAINT user_hero FOREIGN KEY (user_id) REFERENCES cityofmist.t_user(id) NOT VALID;


-- Completed on 2023-07-31 11:05:41

--
-- PostgreSQL database dump complete
--

