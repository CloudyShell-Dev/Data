// scripts/test.ts
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const API_URL = process.env.API_URL || 'http://localhost:3000';
let token: string;
let siteId: string;

const api = axios.create({
  baseURL: API_URL,
  validateStatus: null,
});

async function login() {
  console.log('🔑 Test login...');
  const response = await api.post('/auth/login', {
    email: 'admin@cloudyshell.com',
    password: 'votre_mot_de_passe_admin'
  });

  if (response.status !== 201) {
    throw new Error(`Login failed: ${response.status}`);
  }

  token = response.data.access_token;
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  console.log('✅ Login successful');
}

async function createSite() {
  console.log('🌐 Test site creation...');
  const response = await api.post('/sites', {
    name: 'Test Site',
    url: 'https://test.com',
    version: '1.0.0',
  });

  if (response.status !== 201) {
    throw new Error(`Site creation failed: ${response.status}`);
  }

  siteId = response.data.id;
  console.log('✅ Site created successfully');
}

async function updateMetrics() {
  console.log('📊 Test metrics update...');
  const response = await api.post(`/sites/${siteId}/metrics`, {
    uptime: 99.9,
  });

  if (response.status !== 201) {
    throw new Error(`Metrics update failed: ${response.status}`);
  }
  console.log('✅ Metrics updated successfully');
}

async function getSite() {
  console.log('🔍 Test get site...');
  const response = await api.get(`/sites/${siteId}`);

  if (response.status !== 200) {
    throw new Error(`Get site failed: ${response.status}`);
  }
  console.log('✅ Site retrieved successfully');
}

async function testPagination() {
  console.log('📑 Test pagination...');
  
  // Test première page
  const page1 = await api.get('/sites?page=1&limit=5');
  if (page1.status !== 200) {
    throw new Error(`Pagination page 1 failed: ${page1.status}`);
  }
  
  // Vérifier la structure de la réponse
  if (!page1.data.meta || !page1.data.items) {
    throw new Error('Pagination response structure invalid');
  }

  // Test deuxième page
  const page2 = await api.get('/sites?page=2&limit=5');
  if (page2.status !== 200) {
    throw new Error(`Pagination page 2 failed: ${page2.status}`);
  }

  console.log('✅ Pagination tested successfully');
}

async function testSvgs() {
  console.log('🎨 Test SVG assets...');
  
  // Test light SVG
  const lightSvg = await api.get('/assets/svg/light');
  if (lightSvg.status !== 200) {
    throw new Error(`Light SVG failed: ${lightSvg.status}`);
  }
  if (!lightSvg.headers['content-type']?.includes('image/svg+xml')) {
    throw new Error('Light SVG wrong content type');
  }

  // Test dark SVG
  const darkSvg = await api.get('/assets/svg/dark');
  if (darkSvg.status !== 200) {
    throw new Error(`Dark SVG failed: ${darkSvg.status}`);
  }
  if (!darkSvg.headers['content-type']?.includes('image/svg+xml')) {
    throw new Error('Dark SVG wrong content type');
  }

  console.log('✅ SVG assets tested successfully');
}

async function exportCsv() {
  console.log('📁 Test CSV export...');
  const response = await api.get('/export/csv');

  if (response.status !== 200) {
    throw new Error(`CSV export failed: ${response.status}`);
  }
  console.log('✅ CSV exported successfully');
}

async function runTests() {
  try {
    await login();
    await createSite();
    await updateMetrics();
    await getSite();
    await testPagination();
    await testSvgs();
    await exportCsv();
    console.log('🎉 All tests passed successfully!');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

runTests();