#!/bin/bash

# Test script para probar el endpoint de registro

BASE_URL="http://localhost:3000"

echo "📝 Testing User Registration with new fields..."
echo ""

# Test 1: Register with all fields
echo "1️⃣ Registering user with all details..."
RESPONSE=$(curl -s -X POST "$BASE_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@example.com",
    "password": "password123",
    "firstName": "Juan",
    "lastName": "Pérez",
    "currency": "MXN"
  }')

echo "Response:"
echo "$RESPONSE" | jq . || echo "$RESPONSE"
echo ""

# Test 2: Login with the registered user
echo "2️⃣ Logging in with registered user..."
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@example.com",
    "password": "password123"
  }')

echo "Response:"
echo "$LOGIN_RESPONSE" | jq . || echo "$LOGIN_RESPONSE"
echo ""

# Extract token
TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.data.token // empty')

if [ -z "$TOKEN" ]; then
  echo "❌ Could not extract token"
  exit 1
fi

echo "✅ Token obtained: ${TOKEN:0:20}..."
echo ""

# Test 3: Get categories (protected route)
echo "3️⃣ Testing protected route (GET /categories)..."
CATEGORIES_RESPONSE=$(curl -s -X GET "$BASE_URL/categories" \
  -H "Authorization: Bearer $TOKEN")

echo "Response:"
echo "$CATEGORIES_RESPONSE" | jq . || echo "$CATEGORIES_RESPONSE"
echo ""

echo "✅ All tests completed!"
