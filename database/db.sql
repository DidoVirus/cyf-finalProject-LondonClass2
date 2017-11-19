--
-- PostgreSQL database dump
--

-- Dumped from database version 10.0
-- Dumped by pg_dump version 10.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: convenient_db; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE convenient_db WITH TEMPLATE = template0;


\connect convenient_db

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: meeting_request; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE meeting_request (
    meeting_request_id serial NOT NULL,
    user_id integer,
    subject text,
    week_commencing date
);


--
-- Name: slots; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE slots (
    slot_id serial NOT NULL,
    user_id integer,
    start_timestamp timestamp without time zone,
    note text
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE users (
    user_id serial NOT NULL,
    github_id text,
    github_name text,
    github_username text,
    github_profile_url text,
    github_email text,
    github_avatar_url text,
    email text,
    role_student boolean,
    role_mentor boolean,
    role_organiser boolean
);


--
-- Name: verification_codes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE verification_codes (
    code text,
    role_student boolean,
    role_mentor boolean,
    role_organiser boolean
);


--
-- Name: meeting_request meeting_request_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY meeting_request
    ADD CONSTRAINT meeting_request_pkey PRIMARY KEY (meeting_request_id);


--
-- Name: slots slots_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY slots
    ADD CONSTRAINT slots_pkey PRIMARY KEY (slot_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: slots user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY slots
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES users(user_id);


--
-- Name: meeting_request user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY meeting_request
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES users(user_id);


--
-- PostgreSQL database dump complete
--
