import 'reflect-metadata'
import { buildContainer } from './InversionControl'
import { Server } from './server'
import { Container } from 'inversify';




const start = async (): Promise<void> => {
    // build IOC container
    const container = await buildContainer()

    // build express server
    const server = new Server(container)

    // start server
    server.start(3000)
}

start()