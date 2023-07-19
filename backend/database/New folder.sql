PGDMP                         {            postgres    15.3    15.3 ?    D           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            E           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            F           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            G           1262    5    postgres    DATABASE     �   CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE postgres;
                postgres    false            H           0    0    DATABASE postgres    COMMENT     N   COMMENT ON DATABASE postgres IS 'default administrative connection database';
                   postgres    false    3399                        2615    16398 
   cityofmist    SCHEMA        CREATE SCHEMA cityofmist;
    DROP SCHEMA cityofmist;
                postgres    false                        3079    16384 	   adminpack 	   EXTENSION     A   CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;
    DROP EXTENSION adminpack;
                   false            I           0    0    EXTENSION adminpack    COMMENT     M   COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';
                        false    2            �            1255    16574 C   sp_addTag(integer, bit[], character varying[], character varying[]) 	   PROCEDURE       CREATE PROCEDURE cityofmist."sp_addTag"(IN tagcount integer, IN burned bit[], IN text character varying[], IN questionletter character varying[])
    LANGUAGE plpgsql
    AS $$
DECLARE
    i INT;
    j INT;
    themeIdCounter INT := lastval();
BEGIN
    -- Start the transaction
    BEGIN
        FOR i IN 1..tagcount LOOP
            FOR j IN 1..4 LOOP
                themeIdCounter := themeIdCounter + 1;
                INSERT INTO cityofmist.tag (burned, tag_type, theme_id, tag_name, letter)
                VALUES (
                    burned[j],
                    0,
                    themeIdCounter,
                    text[j],
                    questionLetter[j]
                );
            END LOOP;
        END LOOP;
        COMMIT;
    END;
END;
$$;
 �   DROP PROCEDURE cityofmist."sp_addTag"(IN tagcount integer, IN burned bit[], IN text character varying[], IN questionletter character varying[]);
    
   cityofmist          postgres    false    7            �            1255    16547 \  sp_addTheme(bit, bit, bit, bit, integer, integer, integer, integer, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, integer, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying) 	   PROCEDURE     �  CREATE PROCEDURE cityofmist."sp_addTheme"(IN logosmythos1 bit, IN logosmythos2 bit, IN logosmythos3 bit, IN logosmythos4 bit, IN type1 integer, IN type2 integer, IN type3 integer, IN type4 integer, IN attention10 bit, IN attention20 bit, IN attention30 bit, IN attention11 bit, IN attention21 bit, IN attention31 bit, IN attention12 bit, IN attention22 bit, IN attention32 bit, IN attention13 bit, IN attention23 bit, IN attention33 bit, IN fade10 bit, IN fade20 bit, IN fade30 bit, IN fade11 bit, IN fade21 bit, IN fade31 bit, IN fade12 bit, IN fade22 bit, IN fade32 bit, IN fade13 bit, IN fade23 bit, IN fade33 bit, IN heroid integer, IN title1 character varying, IN title2 character varying, IN title3 character varying, IN title4 character varying, IN mystery1 character varying, IN mystery2 character varying, IN mystery3 character varying, IN mystery4 character varying)
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Start the transaction
    BEGIN
      INSERT INTO cityofmist.theme(
        logos_mythos, theme_type, attention, fade, hero_id, theme_title, mystery)
        VALUES (CAST(LogosMythos1 AS bit), Type1, CAST(ARRAY[Attention10,Attention20,Attention30] AS bit[]), CAST(ARRAY[Fade10,Fade20,Fade30] AS bit[]), heroID, Title1, Mystery1);
      INSERT INTO cityofmist.theme(
        logos_mythos, theme_type, attention, fade, hero_id, theme_title, mystery)
        VALUES (CAST(LogosMythos2 AS bit), Type2, CAST(ARRAY[Attention11,Attention21,Attention31] AS bit[]), CAST(ARRAY[Fade11,Fade21,Fade31] AS bit[]), heroID, Title2, Mystery2);
      INSERT INTO cityofmist.theme(
        logos_mythos, theme_type, attention, fade, hero_id, theme_title, mystery)
        VALUES (CAST(LogosMythos3 AS bit), Type3, CAST(ARRAY[Attention12,Attention22,Attention32] AS bit[]), CAST(ARRAY[Fade12,Fade22,Fade32] AS bit[]), heroID, Title3, Mystery3);
      INSERT INTO cityofmist.theme(
        logos_mythos, theme_type, attention, fade, hero_id, theme_title, mystery)
        VALUES (CAST(LogosMythos4 AS bit), Type4, CAST(ARRAY[Attention13,Attention23,Attention33] AS bit[]), CAST(ARRAY[Fade13,Fade23,Fade33] AS bit[]), heroID, Title4, Mystery4);
        COMMIT;
    END;
END;
$$;
 l  DROP PROCEDURE cityofmist."sp_addTheme"(IN logosmythos1 bit, IN logosmythos2 bit, IN logosmythos3 bit, IN logosmythos4 bit, IN type1 integer, IN type2 integer, IN type3 integer, IN type4 integer, IN attention10 bit, IN attention20 bit, IN attention30 bit, IN attention11 bit, IN attention21 bit, IN attention31 bit, IN attention12 bit, IN attention22 bit, IN attention32 bit, IN attention13 bit, IN attention23 bit, IN attention33 bit, IN fade10 bit, IN fade20 bit, IN fade30 bit, IN fade11 bit, IN fade21 bit, IN fade31 bit, IN fade12 bit, IN fade22 bit, IN fade32 bit, IN fade13 bit, IN fade23 bit, IN fade33 bit, IN heroid integer, IN title1 character varying, IN title2 character varying, IN title3 character varying, IN title4 character varying, IN mystery1 character varying, IN mystery2 character varying, IN mystery3 character varying, IN mystery4 character varying);
    
   cityofmist          postgres    false    7            �            1255    16577 �  sp_addTheme(bit, bit, bit, bit, integer, integer, integer, integer, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, integer, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, integer, bit[], character varying[], character varying[]) 	   PROCEDURE     #  CREATE PROCEDURE cityofmist."sp_addTheme"(IN logosmythos1 bit, IN logosmythos2 bit, IN logosmythos3 bit, IN logosmythos4 bit, IN type1 integer, IN type2 integer, IN type3 integer, IN type4 integer, IN attention10 bit, IN attention20 bit, IN attention30 bit, IN attention11 bit, IN attention21 bit, IN attention31 bit, IN attention12 bit, IN attention22 bit, IN attention32 bit, IN attention13 bit, IN attention23 bit, IN attention33 bit, IN fade10 bit, IN fade20 bit, IN fade30 bit, IN fade11 bit, IN fade21 bit, IN fade31 bit, IN fade12 bit, IN fade22 bit, IN fade32 bit, IN fade13 bit, IN fade23 bit, IN fade33 bit, IN heroid integer, IN title1 character varying, IN title2 character varying, IN title3 character varying, IN title4 character varying, IN mystery1 character varying, IN mystery2 character varying, IN mystery3 character varying, IN mystery4 character varying, IN tagcount integer, IN burned bit[], IN text character varying[], IN questionletter character varying[])
    LANGUAGE plpgsql
    AS $_$
BEGIN
    -- Start the transaction
    BEGIN
      INSERT INTO cityofmist.theme(
        logos_mythos, theme_type, attention, fade, hero_id, theme_title, mystery)
        VALUES (CAST(LogosMythos1 AS bit), Type1, CAST(ARRAY[Attention10,Attention20,Attention30] AS bit[]), CAST(ARRAY[Fade10,Fade20,Fade30] AS bit[]), heroID, Title1, Mystery1);
      INSERT INTO cityofmist.theme(
        logos_mythos, theme_type, attention, fade, hero_id, theme_title, mystery)
        VALUES (CAST(LogosMythos2 AS bit), Type2, CAST(ARRAY[Attention11,Attention21,Attention31] AS bit[]), CAST(ARRAY[Fade11,Fade21,Fade31] AS bit[]), heroID, Title2, Mystery2);
      INSERT INTO cityofmist.theme(
        logos_mythos, theme_type, attention, fade, hero_id, theme_title, mystery)
        VALUES (CAST(LogosMythos3 AS bit), Type3, CAST(ARRAY[Attention12,Attention22,Attention32] AS bit[]), CAST(ARRAY[Fade12,Fade22,Fade32] AS bit[]), heroID, Title3, Mystery3);
      INSERT INTO cityofmist.theme(
        logos_mythos, theme_type, attention, fade, hero_id, theme_title, mystery)
        VALUES (CAST(LogosMythos4 AS bit), Type4, CAST(ARRAY[Attention13,Attention23,Attention33] AS bit[]), CAST(ARRAY[Fade13,Fade23,Fade33] AS bit[]), heroID, Title4, Mystery4);
        
		
		DO $$
        DECLARE
            i INT;
            j INT;
        BEGIN
            FOR i IN 1..tagcount LOOP
                FOR j IN 1..4 LOOP
                    INSERT INTO cityofmist.tag (burned, tag_type, theme_id, tag_name, letter)
                    SELECT
                        burned[j],
                        0,
                        lastval() + i,
                        text[j],
                        questionLetter[j]
                    FROM generate_series(1, 3);
                END LOOP;
            END LOOP;
        END $$;
		COMMIT;
    END;
END;
$_$;
 �  DROP PROCEDURE cityofmist."sp_addTheme"(IN logosmythos1 bit, IN logosmythos2 bit, IN logosmythos3 bit, IN logosmythos4 bit, IN type1 integer, IN type2 integer, IN type3 integer, IN type4 integer, IN attention10 bit, IN attention20 bit, IN attention30 bit, IN attention11 bit, IN attention21 bit, IN attention31 bit, IN attention12 bit, IN attention22 bit, IN attention32 bit, IN attention13 bit, IN attention23 bit, IN attention33 bit, IN fade10 bit, IN fade20 bit, IN fade30 bit, IN fade11 bit, IN fade21 bit, IN fade31 bit, IN fade12 bit, IN fade22 bit, IN fade32 bit, IN fade13 bit, IN fade23 bit, IN fade33 bit, IN heroid integer, IN title1 character varying, IN title2 character varying, IN title3 character varying, IN title4 character varying, IN mystery1 character varying, IN mystery2 character varying, IN mystery3 character varying, IN mystery4 character varying, IN tagcount integer, IN burned bit[], IN text character varying[], IN questionletter character varying[]);
    
   cityofmist          postgres    false    7            �            1255    16578 D  sp_addTheme(bit, bit, bit, bit, integer, integer, integer, integer, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, integer, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, integer, bit[], character varying[], character varying[], integer, bit[], character varying[], character varying[], integer, bit[], character varying[], character varying[], integer, bit[], character varying[], character varying[]) 	   PROCEDURE     �  CREATE PROCEDURE cityofmist."sp_addTheme"(IN logosmythos1 bit, IN logosmythos2 bit, IN logosmythos3 bit, IN logosmythos4 bit, IN type1 integer, IN type2 integer, IN type3 integer, IN type4 integer, IN attention10 bit, IN attention20 bit, IN attention30 bit, IN attention11 bit, IN attention21 bit, IN attention31 bit, IN attention12 bit, IN attention22 bit, IN attention32 bit, IN attention13 bit, IN attention23 bit, IN attention33 bit, IN fade10 bit, IN fade20 bit, IN fade30 bit, IN fade11 bit, IN fade21 bit, IN fade31 bit, IN fade12 bit, IN fade22 bit, IN fade32 bit, IN fade13 bit, IN fade23 bit, IN fade33 bit, IN heroid integer, IN title1 character varying, IN title2 character varying, IN title3 character varying, IN title4 character varying, IN mystery1 character varying, IN mystery2 character varying, IN mystery3 character varying, IN mystery4 character varying, IN tagcount1 integer, IN burned1 bit[], IN text1 character varying[], IN questionletter1 character varying[], IN tagcount2 integer, IN burned2 bit[], IN text2 character varying[], IN questionletter2 character varying[], IN tagcount3 integer, IN burned3 bit[], IN text3 character varying[], IN questionletter3 character varying[], IN tagcount4 integer, IN burned4 bit[], IN text4 character varying[], IN questionletter4 character varying[])
    LANGUAGE plpgsql
    AS $$
DECLARE
    i INT;
    j INT;
BEGIN
    -- Start the transaction
    BEGIN
        INSERT INTO cityofmist.theme(
            logos_mythos, theme_type, attention, fade, hero_id, theme_title, mystery)
        VALUES (logosmythos1, type1, ARRAY[attention10, attention20, attention30], ARRAY[fade10, fade20, fade30], heroid, title1, mystery1);
        
        INSERT INTO cityofmist.theme(
            logos_mythos, theme_type, attention, fade, hero_id, theme_title, mystery)
        VALUES (logosmythos2, type2, ARRAY[attention11, attention21, attention31], ARRAY[fade11, fade21, fade31], heroid, title2, mystery2);
        
        INSERT INTO cityofmist.theme(
            logos_mythos, theme_type, attention, fade, hero_id, theme_title, mystery)
        VALUES (logosmythos3, type3, ARRAY[attention12, attention22, attention32], ARRAY[fade12, fade22, fade32], heroid, title3, mystery3);
        
        INSERT INTO cityofmist.theme(
            logos_mythos, theme_type, attention, fade, hero_id, theme_title, mystery)
        VALUES (logosmythos4, type4, ARRAY[attention13, attention23, attention33], ARRAY[fade13, fade23, fade33], heroid, title4, mystery4);
        
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
                    0,
                    i,
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
 $  DROP PROCEDURE cityofmist."sp_addTheme"(IN logosmythos1 bit, IN logosmythos2 bit, IN logosmythos3 bit, IN logosmythos4 bit, IN type1 integer, IN type2 integer, IN type3 integer, IN type4 integer, IN attention10 bit, IN attention20 bit, IN attention30 bit, IN attention11 bit, IN attention21 bit, IN attention31 bit, IN attention12 bit, IN attention22 bit, IN attention32 bit, IN attention13 bit, IN attention23 bit, IN attention33 bit, IN fade10 bit, IN fade20 bit, IN fade30 bit, IN fade11 bit, IN fade21 bit, IN fade31 bit, IN fade12 bit, IN fade22 bit, IN fade32 bit, IN fade13 bit, IN fade23 bit, IN fade33 bit, IN heroid integer, IN title1 character varying, IN title2 character varying, IN title3 character varying, IN title4 character varying, IN mystery1 character varying, IN mystery2 character varying, IN mystery3 character varying, IN mystery4 character varying, IN tagcount1 integer, IN burned1 bit[], IN text1 character varying[], IN questionletter1 character varying[], IN tagcount2 integer, IN burned2 bit[], IN text2 character varying[], IN questionletter2 character varying[], IN tagcount3 integer, IN burned3 bit[], IN text3 character varying[], IN questionletter3 character varying[], IN tagcount4 integer, IN burned4 bit[], IN text4 character varying[], IN questionletter4 character varying[]);
    
   cityofmist          postgres    false    7            �            1255    16550 z  sp_updateTheme(bit, bit, bit, bit, integer, integer, integer, integer, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, bit, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, integer, integer, integer, integer) 	   PROCEDURE     �	  CREATE PROCEDURE cityofmist."sp_updateTheme"(IN logosmythos1 bit, IN logosmythos2 bit, IN logosmythos3 bit, IN logosmythos4 bit, IN type1 integer, IN type2 integer, IN type3 integer, IN type4 integer, IN attention10 bit, IN attention20 bit, IN attention30 bit, IN attention11 bit, IN attention21 bit, IN attention31 bit, IN attention12 bit, IN attention22 bit, IN attention32 bit, IN attention13 bit, IN attention23 bit, IN attention33 bit, IN fade10 bit, IN fade20 bit, IN fade30 bit, IN fade11 bit, IN fade21 bit, IN fade31 bit, IN fade12 bit, IN fade22 bit, IN fade32 bit, IN fade13 bit, IN fade23 bit, IN fade33 bit, IN title1 character varying, IN title2 character varying, IN title3 character varying, IN title4 character varying, IN mystery1 character varying, IN mystery2 character varying, IN mystery3 character varying, IN mystery4 character varying, IN themeid1 integer, IN themeid2 integer, IN themeid3 integer, IN themeid4 integer)
    LANGUAGE plpgsql
    AS $$
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

        COMMIT;
    END;
END;
$$;
 �  DROP PROCEDURE cityofmist."sp_updateTheme"(IN logosmythos1 bit, IN logosmythos2 bit, IN logosmythos3 bit, IN logosmythos4 bit, IN type1 integer, IN type2 integer, IN type3 integer, IN type4 integer, IN attention10 bit, IN attention20 bit, IN attention30 bit, IN attention11 bit, IN attention21 bit, IN attention31 bit, IN attention12 bit, IN attention22 bit, IN attention32 bit, IN attention13 bit, IN attention23 bit, IN attention33 bit, IN fade10 bit, IN fade20 bit, IN fade30 bit, IN fade11 bit, IN fade21 bit, IN fade31 bit, IN fade12 bit, IN fade22 bit, IN fade32 bit, IN fade13 bit, IN fade23 bit, IN fade33 bit, IN title1 character varying, IN title2 character varying, IN title3 character varying, IN title4 character varying, IN mystery1 character varying, IN mystery2 character varying, IN mystery3 character varying, IN mystery4 character varying, IN themeid1 integer, IN themeid2 integer, IN themeid3 integer, IN themeid4 integer);
    
   cityofmist          postgres    false    7            �            1259    16406    hero    TABLE     �   CREATE TABLE cityofmist.hero (
    id integer NOT NULL,
    user_id integer,
    hero_name character varying(100),
    user_hero_subid integer
);
    DROP TABLE cityofmist.hero;
    
   cityofmist         heap    postgres    false    7            �            1259    16525    hero_id_seq    SEQUENCE     �   ALTER TABLE cityofmist.hero ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME cityofmist.hero_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
         
   cityofmist          postgres    false    7    217            �            1259    16399    t_user    TABLE     �   CREATE TABLE cityofmist.t_user (
    id integer NOT NULL,
    user_name character varying(100),
    password character varying(100)
);
    DROP TABLE cityofmist.t_user;
    
   cityofmist         heap    postgres    false    7            �            1259    16475    t_user_ID_seq    SEQUENCE     �   ALTER TABLE cityofmist.t_user ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME cityofmist."t_user_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
         
   cityofmist          postgres    false    216    7            �            1259    16432    tag    TABLE     �   CREATE TABLE cityofmist.tag (
    id integer NOT NULL,
    burned bit(1),
    tag_type smallint,
    theme_id integer,
    tag_name character varying,
    letter character varying(1)
);
    DROP TABLE cityofmist.tag;
    
   cityofmist         heap    postgres    false    7            �            1259    16523 
   tag_id_seq    SEQUENCE     �   ALTER TABLE cityofmist.tag ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME cityofmist.tag_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
         
   cityofmist          postgres    false    221    7            �            1259    16413    theme    TABLE     �   CREATE TABLE cityofmist.theme (
    id integer NOT NULL,
    logos_mythos bit(1),
    theme_type integer,
    attention bit(1)[],
    fade bit(1)[],
    hero_id integer,
    theme_title character varying(500),
    mystery character varying(500)
);
    DROP TABLE cityofmist.theme;
    
   cityofmist         heap    postgres    false    7            �            1259    16484    theme_id_seq    SEQUENCE     �   ALTER TABLE cityofmist.theme ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME cityofmist.theme_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
         
   cityofmist          postgres    false    7    218            �            1259    16420    trick    TABLE     w   CREATE TABLE cityofmist.trick (
    id integer NOT NULL,
    hero_id integer,
    trick_name character varying(100)
);
    DROP TABLE cityofmist.trick;
    
   cityofmist         heap    postgres    false    7            �            1259    16427    trickTag    TABLE     j   CREATE TABLE cityofmist."trickTag" (
    id integer NOT NULL,
    trick_id integer,
    tag_id integer
);
 "   DROP TABLE cityofmist."trickTag";
    
   cityofmist         heap    postgres    false    7            �            1259    16524    trickTag_id_seq    SEQUENCE     �   ALTER TABLE cityofmist."trickTag" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME cityofmist."trickTag_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
         
   cityofmist          postgres    false    220    7            �            1259    16485    trick_id_seq    SEQUENCE     �   ALTER TABLE cityofmist.trick ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME cityofmist.trick_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
         
   cityofmist          postgres    false    219    7            �            1259    16552    my_table    TABLE     R   CREATE TABLE public.my_table (
    id integer NOT NULL,
    my_array integer[]
);
    DROP TABLE public.my_table;
       public         heap    postgres    false            �            1259    16551    my_table_id_seq    SEQUENCE     �   CREATE SEQUENCE public.my_table_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.my_table_id_seq;
       public          postgres    false    229            J           0    0    my_table_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.my_table_id_seq OWNED BY public.my_table.id;
          public          postgres    false    228            �           2604    16555    my_table id    DEFAULT     j   ALTER TABLE ONLY public.my_table ALTER COLUMN id SET DEFAULT nextval('public.my_table_id_seq'::regclass);
 :   ALTER TABLE public.my_table ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    229    228    229            5          0    16406    hero 
   TABLE DATA           K   COPY cityofmist.hero (id, user_id, hero_name, user_hero_subid) FROM stdin;
 
   cityofmist          postgres    false    217   ć       4          0    16399    t_user 
   TABLE DATA           =   COPY cityofmist.t_user (id, user_name, password) FROM stdin;
 
   cityofmist          postgres    false    216   �       9          0    16432    tag 
   TABLE DATA           S   COPY cityofmist.tag (id, burned, tag_type, theme_id, tag_name, letter) FROM stdin;
 
   cityofmist          postgres    false    221   Q�       6          0    16413    theme 
   TABLE DATA           q   COPY cityofmist.theme (id, logos_mythos, theme_type, attention, fade, hero_id, theme_title, mystery) FROM stdin;
 
   cityofmist          postgres    false    218   ��       7          0    16420    trick 
   TABLE DATA           <   COPY cityofmist.trick (id, hero_id, trick_name) FROM stdin;
 
   cityofmist          postgres    false    219   �       8          0    16427    trickTag 
   TABLE DATA           >   COPY cityofmist."trickTag" (id, trick_id, tag_id) FROM stdin;
 
   cityofmist          postgres    false    220   <�       A          0    16552    my_table 
   TABLE DATA           0   COPY public.my_table (id, my_array) FROM stdin;
    public          postgres    false    229   m�       K           0    0    hero_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('cityofmist.hero_id_seq', 1, false);
       
   cityofmist          postgres    false    227            L           0    0    t_user_ID_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('cityofmist."t_user_ID_seq"', 15, true);
       
   cityofmist          postgres    false    222            M           0    0 
   tag_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('cityofmist.tag_id_seq', 211, true);
       
   cityofmist          postgres    false    225            N           0    0    theme_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('cityofmist.theme_id_seq', 225, true);
       
   cityofmist          postgres    false    223            O           0    0    trickTag_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('cityofmist."trickTag_id_seq"', 1, false);
       
   cityofmist          postgres    false    226            P           0    0    trick_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('cityofmist.trick_id_seq', 1, true);
       
   cityofmist          postgres    false    224            Q           0    0    my_table_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.my_table_id_seq', 3, true);
          public          postgres    false    228            �           2606    16412    hero hero_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY cityofmist.hero
    ADD CONSTRAINT hero_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY cityofmist.hero DROP CONSTRAINT hero_pkey;
    
   cityofmist            postgres    false    217            �           2606    16438    tag tag_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY cityofmist.tag
    ADD CONSTRAINT tag_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY cityofmist.tag DROP CONSTRAINT tag_pkey;
    
   cityofmist            postgres    false    221            �           2606    16419    theme theme_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY cityofmist.theme
    ADD CONSTRAINT theme_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY cityofmist.theme DROP CONSTRAINT theme_pkey;
    
   cityofmist            postgres    false    218            �           2606    16431    trickTag trickTag_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY cityofmist."trickTag"
    ADD CONSTRAINT "trickTag_pkey" PRIMARY KEY (id);
 H   ALTER TABLE ONLY cityofmist."trickTag" DROP CONSTRAINT "trickTag_pkey";
    
   cityofmist            postgres    false    220            �           2606    16426    trick trick_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY cityofmist.trick
    ADD CONSTRAINT trick_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY cityofmist.trick DROP CONSTRAINT trick_pkey;
    
   cityofmist            postgres    false    219            �           2606    16405    t_user user_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY cityofmist.t_user
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY cityofmist.t_user DROP CONSTRAINT user_pkey;
    
   cityofmist            postgres    false    216            �           2606    16559    my_table my_table_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.my_table
    ADD CONSTRAINT my_table_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.my_table DROP CONSTRAINT my_table_pkey;
       public            postgres    false    229            �           1259    16456    fki_h    INDEX     >   CREATE INDEX fki_h ON cityofmist.theme USING btree (hero_id);
    DROP INDEX cityofmist.fki_h;
    
   cityofmist            postgres    false    218            �           1259    16481    fki_hero_key    INDEX     D   CREATE INDEX fki_hero_key ON cityofmist.hero USING btree (user_id);
 $   DROP INDEX cityofmist.fki_hero_key;
    
   cityofmist            postgres    false    217            �           1259    16462    fki_hero_trick    INDEX     G   CREATE INDEX fki_hero_trick ON cityofmist.trick USING btree (hero_id);
 &   DROP INDEX cityofmist.fki_hero_trick;
    
   cityofmist            postgres    false    219            �           1259    16450    fki_theme_tag    INDEX     E   CREATE INDEX fki_theme_tag ON cityofmist.tag USING btree (theme_id);
 %   DROP INDEX cityofmist.fki_theme_tag;
    
   cityofmist            postgres    false    221            �           1259    16474    fki_tricktag_tag    INDEX     M   CREATE INDEX fki_tricktag_tag ON cityofmist."trickTag" USING btree (tag_id);
 (   DROP INDEX cityofmist.fki_tricktag_tag;
    
   cityofmist            postgres    false    220            �           1259    16468    fki_tricktag_trick    INDEX     Q   CREATE INDEX fki_tricktag_trick ON cityofmist."trickTag" USING btree (trick_id);
 *   DROP INDEX cityofmist.fki_tricktag_trick;
    
   cityofmist            postgres    false    220            �           1259    16444    fki_user_hero    INDEX     E   CREATE INDEX fki_user_hero ON cityofmist.hero USING btree (user_id);
 %   DROP INDEX cityofmist.fki_user_hero;
    
   cityofmist            postgres    false    217            �           2606    16457    trick hero_trick    FK CONSTRAINT     �   ALTER TABLE ONLY cityofmist.trick
    ADD CONSTRAINT hero_trick FOREIGN KEY (hero_id) REFERENCES cityofmist.hero(id) NOT VALID;
 >   ALTER TABLE ONLY cityofmist.trick DROP CONSTRAINT hero_trick;
    
   cityofmist          postgres    false    217    3216    219            �           2606    16451    theme theme_hero    FK CONSTRAINT     �   ALTER TABLE ONLY cityofmist.theme
    ADD CONSTRAINT theme_hero FOREIGN KEY (hero_id) REFERENCES cityofmist.hero(id) NOT VALID;
 >   ALTER TABLE ONLY cityofmist.theme DROP CONSTRAINT theme_hero;
    
   cityofmist          postgres    false    217    3216    218            �           2606    16445    tag theme_tag    FK CONSTRAINT        ALTER TABLE ONLY cityofmist.tag
    ADD CONSTRAINT theme_tag FOREIGN KEY (theme_id) REFERENCES cityofmist.theme(id) NOT VALID;
 ;   ALTER TABLE ONLY cityofmist.tag DROP CONSTRAINT theme_tag;
    
   cityofmist          postgres    false    221    3219    218            �           2606    16469    trickTag tricktag_tag    FK CONSTRAINT     �   ALTER TABLE ONLY cityofmist."trickTag"
    ADD CONSTRAINT tricktag_tag FOREIGN KEY (tag_id) REFERENCES cityofmist.tag(id) NOT VALID;
 E   ALTER TABLE ONLY cityofmist."trickTag" DROP CONSTRAINT tricktag_tag;
    
   cityofmist          postgres    false    220    3229    221            �           2606    16463    trickTag tricktag_trick    FK CONSTRAINT     �   ALTER TABLE ONLY cityofmist."trickTag"
    ADD CONSTRAINT tricktag_trick FOREIGN KEY (trick_id) REFERENCES cityofmist.trick(id) NOT VALID;
 G   ALTER TABLE ONLY cityofmist."trickTag" DROP CONSTRAINT tricktag_trick;
    
   cityofmist          postgres    false    220    3222    219            �           2606    16476    hero user_hero    FK CONSTRAINT     �   ALTER TABLE ONLY cityofmist.hero
    ADD CONSTRAINT user_hero FOREIGN KEY (user_id) REFERENCES cityofmist.t_user(id) NOT VALID;
 <   ALTER TABLE ONLY cityofmist.hero DROP CONSTRAINT user_hero;
    
   cityofmist          postgres    false    216    217    3212            5      x�3�4�t�O�4�2��K8�b���� :nD      4   N   x�3�,(M��L�,H,..�/J�2�t�OBp�Q�&�\SNk���o�ƷD���������2F��� &)NN      9   [   x�5ͻ�0���<$P�C����F�U_��g��IA�%��ր��������f�n��]���^�y�\Rx>���W�AD�2�      6   K   x�3�4�4�6�1�1�� ڐ�3/�3���$������1 �1���j���A�CԀiT5&@��b���� ��$�      7      x�3�4���/������ �n      8   !   x�3�4�4�2�&\� �!��2����� 8��      A   1   x�3�64�12�16��2�61�1��9��t�t,t,��=... ���     