// @flow
import fs from 'fs'
import json5 from 'json5'
import type { ConfigType } from './type'

const findBabelrc = (path: string): ConfigType => {
    try {
        const babelrc = fs.readFileSync(path, 'utf-8')
        return json5.parse(babelrc)
    } catch (error) {
        if (error.code === 'ENOENT') {
            return null
        } else {
            throw error
        }
    }
}

const normalizeConfig = (config: ConfigType): ConfigType => (Object.assign({}, config))

 const babelConfig = (path: string, script: string): ConfigType => {
    const babelrc = findBabelrc(path)

    //npm_lifecycle_event for script
    if (script === 'develop') {
        babelrc.presets.unshift('react-hmre')
    }
    return normalizeConfig(babelrc)
}

module.exports = babelConfig
