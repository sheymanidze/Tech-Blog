const sequelize = require('../config/connection');
const { User } = require('../models');
const { Post } = require('../models')
const { Comments } = require('../models')

const userData = require('./userData.json');
const postData = require('./birdData.json')
const commentsData = require('./sightingData.json')