import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { User } from './entity/User';
import express from 'express';

const main = async () => {
  const con = await createConnection();
};

main();
