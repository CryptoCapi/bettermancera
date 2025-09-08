
        function toggleMenu() {
            const menu = document.getElementById('mobileMenu');
            menu.classList.toggle('hidden');
        }

        function scrollToSection(sectionId) {
            document.getElementById(sectionId).scrollIntoView({
                behavior: 'smooth'
            });
        }

        function downloadCatalog() {
            // Simular descarga de catálogo
            alert('¡Perfecto! Te enviaremos el catálogo actualizado por WhatsApp. Contáctanos al 477-223-3286 para recibirlo inmediatamente.');
            window.open('https://wa.me/524772233286?text=Hola! Me interesa recibir el catálogo actualizado de BetterMancera', '_blank');
        }

        // Base de datos de productos de ejemplo
        const productsDatabase = {
            organizacion: [
                {
                    name: "Organizador Multiusos Premium",
                    description: "Perfecto para closets y espacios pequeños",
                    price: "$299",
                    features: ["Resistente", "Fácil instalación", "Múltiples compartimentos"],
                    icon: "fas fa-box"
                },
                {
                    name: "Cajas Apilables Transparentes",
                    description: "Set de 6 cajas con tapa hermética",
                    price: "$199",
                    features: ["Transparentes", "Apilables", "Herméticas"],
                    icon: "fas fa-cube"
                },
                {
                    name: "Organizador de Zapatos",
                    description: "Hasta 20 pares en poco espacio",
                    price: "$249",
                    features: ["Ahorra espacio", "Fácil acceso", "Resistente"],
                    icon: "fas fa-shoe-prints"
                },
                {
                    name: "Contenedores de Cocina",
                    description: "Set de 8 contenedores herméticos",
                    price: "$179",
                    features: ["Herméticos", "Aptos lavavajillas", "Etiquetas incluidas"],
                    icon: "fas fa-jar"
                },
                {
                    name: "Organizador de Baño",
                    description: "Maximiza el espacio en tu baño",
                    price: "$159",
                    features: ["Resistente al agua", "Fácil limpieza", "Múltiples niveles"],
                    icon: "fas fa-bath"
                },
                {
                    name: "Caja Organizadora XXL",
                    description: "Para ropa de temporada y más",
                    price: "$129",
                    features: ["Gran capacidad", "Tapa reforzada", "Asas resistentes"],
                    icon: "fas fa-archive"
                }
            ],
            cocina: [
                {
                    name: "Juego de Cuchillos Profesional",
                    description: "Set completo con base magnética",
                    price: "$399",
                    features: ["Acero inoxidable", "Ergonómicos", "Base magnética"],
                    icon: "fas fa-cut"
                },
                {
                    name: "Procesador de Alimentos",
                    description: "Corta, pica y mezcla en segundos",
                    price: "$299",
                    features: ["Múltiples cuchillas", "Fácil limpieza", "Compacto"],
                    icon: "fas fa-blender"
                },
                {
                    name: "Set de Sartenes Antiadherentes",
                    description: "3 tamaños, cocina sin aceite",
                    price: "$449",
                    features: ["Antiadherente", "Distribución uniforme", "Mangos ergonómicos"],
                    icon: "fas fa-circle"
                },
                {
                    name: "Organizador de Especias",
                    description: "Mantén tus especias ordenadas",
                    price: "$89",
                    features: ["Giratorio", "Etiquetas incluidas", "Frascos herméticos"],
                    icon: "fas fa-pepper-hot"
                },
                {
                    name: "Tabla de Cortar Inteligente",
                    description: "Con compartimentos y medidor",
                    price: "$149",
                    features: ["Compartimentos", "Medidor integrado", "Antibacterial"],
                    icon: "fas fa-square"
                },
                {
                    name: "Utensilios de Silicón Premium",
                    description: "Set de 12 piezas resistentes al calor",
                    price: "$199",
                    features: ["Resistente al calor", "No raya", "Fácil limpieza"],
                    icon: "fas fa-utensils"
                }
            ],
            limpieza: [
                {
                    name: "Aspiradora Sin Cable",
                    description: "Potente y ligera para toda la casa",
                    price: "$599",
                    features: ["Sin cable", "Múltiples accesorios", "Batería duradera"],
                    icon: "fas fa-wind"
                },
                {
                    name: "Kit de Limpieza Completo",
                    description: "Todo lo que necesitas en un set",
                    price: "$199",
                    features: ["15 productos", "Ecológicos", "Multiusos"],
                    icon: "fas fa-spray-can"
                },
                {
                    name: "Mopa Giratoria 360°",
                    description: "Limpia hasta los rincones más difíciles",
                    price: "$149",
                    features: ["Gira 360°", "Microfibra", "Escurridor incluido"],
                    icon: "fas fa-broom"
                },
                {
                    name: "Limpiador de Ventanas Magnético",
                    description: "Limpia ambos lados simultáneamente",
                    price: "$99",
                    features: ["Magnético", "Seguro", "Eficiente"],
                    icon: "fas fa-window-maximize"
                },
                {
                    name: "Organizador de Limpieza",
                    description: "Mantén todos tus productos ordenados",
                    price: "$79",
                    features: ["Múltiples compartimentos", "Portátil", "Resistente"],
                    icon: "fas fa-toolbox"
                },
                {
                    name: "Paños de Microfibra Premium",
                    description: "Set de 12 paños de alta calidad",
                    price: "$59",
                    features: ["Súper absorbentes", "Reutilizables", "Diferentes colores"],
                    icon: "fas fa-tshirt"
                }
            ]
        };

        function showProducts(category) {
            const modal = document.getElementById('productsModal');
            const modalTitle = document.getElementById('modalTitle');
            const productsGrid = document.getElementById('productsGrid');
            
            // Configurar título
            const titles = {
                'organizacion': 'Productos de Organización',
                'cocina': 'Productos de Cocina',
                'limpieza': 'Productos de Limpieza'
            };
            
            modalTitle.textContent = titles[category];
            
            // Limpiar grid anterior
            productsGrid.innerHTML = '';
            
            // Cargar productos
            const products = productsDatabase[category] || [];
            
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow';
                
                productCard.innerHTML = `
                    <div class="text-center mb-4">
                        <div class="w-16 h-16 bg-gradient-to-r from-betterware-blue to-betterware-mint rounded-full flex items-center justify-center mx-auto mb-3">
                            <i class="${product.icon} text-white text-2xl"></i>
                        </div>
                        <h3 class="font-bold text-betterware-dark mb-2">${product.name}</h3>
                        <p class="text-gray-600 text-sm mb-3">${product.description}</p>
                        <div class="text-2xl font-bold text-betterware-blue mb-3">${product.price}</div>
                    </div>
                    
                    <div class="space-y-2 mb-4">
                        ${product.features.map(feature => `
                            <div class="flex items-center text-sm text-gray-600">
                                <i class="fas fa-check text-betterware-green mr-2"></i>
                                ${feature}
                            </div>
                        `).join('')}
                    </div>
                    
                    <button onclick="contactForProduct('${product.name}')" class="w-full bg-gradient-to-r from-betterware-blue to-betterware-mint text-white py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                        <i class="fab fa-whatsapp mr-2"></i>Consultar
                    </button>
                `;
                
                productsGrid.appendChild(productCard);
            });
            
            // Mostrar modal
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }

        function closeProductsModal() {
            const modal = document.getElementById('productsModal');
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }

        function contactForProduct(productName) {
            const message = `Hola! Me interesa el producto: ${productName}. ¿Podrían darme más información y disponibilidad?`;
            window.open(`https://wa.me/524772233286?text=${encodeURIComponent(message)}`, '_blank');
        }

        // Cerrar modal al hacer clic fuera
        document.getElementById('productsModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeProductsModal();
            }
        });

        // Smooth scrolling para enlaces del menú
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Cerrar menú móvil al hacer clic en un enlace
        document.querySelectorAll('#mobileMenu a').forEach(link => {
            link.addEventListener('click', () => {
                document.getElementById('mobileMenu').classList.add('hidden');
            });
        });

        // Funciones del Bot de Soporte IA
        let chatOpen = false;

        function toggleChat() {
            const chatWindow = document.getElementById('chatWindow');
            const chatIcon = document.getElementById('chatIcon');
            
            chatOpen = !chatOpen;
            
            if (chatOpen) {
                chatWindow.classList.remove('hidden');
                chatIcon.className = 'fas fa-times text-2xl';
            } else {
                chatWindow.classList.add('hidden');
                chatIcon.className = 'fas fa-robot text-2xl';
            }
        }

        function addMessage(message, isUser = false) {
            const chatMessages = document.getElementById('chatMessages');
            const messageDiv = document.createElement('div');
            
            if (isUser) {
                messageDiv.innerHTML = `
                    <div class="flex items-start space-x-2 justify-end">
                        <div class="bg-gradient-to-r from-betterware-blue to-betterware-mint text-white rounded-lg p-3 shadow-sm max-w-xs">
                            <p class="text-sm">${message}</p>
                        </div>
                        <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                            <i class="fas fa-user text-gray-600 text-xs"></i>
                        </div>
                    </div>
                `;
            } else {
                messageDiv.innerHTML = `
                    <div class="flex items-start space-x-2">
                        <div class="w-8 h-8 bg-gradient-to-r from-betterware-blue to-betterware-mint rounded-full flex items-center justify-center flex-shrink-0">
                            <i class="fas fa-robot text-white text-xs"></i>
                        </div>
                        <div class="bg-white rounded-lg p-3 shadow-sm max-w-xs">
                            <p class="text-sm text-gray-800">${message}</p>
                        </div>
                    </div>
                `;
            }
            
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        // Sistema de respuestas inteligentes del bot
        let conversationContext = {
            userName: null,
            interests: [],
            lastTopic: null,
            messageCount: 0
        };

        function getBotResponse(userMessage) {
            const message = userMessage.toLowerCase();
            conversationContext.messageCount++;
            
            // Detectar nombre del usuario
            if (message.includes('me llamo') || message.includes('soy ') || message.includes('mi nombre es')) {
                const nameMatch = message.match(/(?:me llamo|soy|mi nombre es)\s+([a-záéíóúñ]+)/i);
                if (nameMatch) {
                    conversationContext.userName = nameMatch[1];
                    return `¡Mucho gusto, ${conversationContext.userName}! 😊 Es genial conocerte. Ahora puedo ayudarte de manera más personalizada. ¿En qué estás interesado/a hoy?`;
                }
            }

            // Respuestas sobre catálogo
            if (message.includes('catalogo') || message.includes('catálogo')) {
                conversationContext.lastTopic = 'catalogo';
                const responses = [
                    '📖 ¡Excelente! Nuestro catálogo de Diciembre 2024 tiene productos increíbles. Desde organizadores hasta utensilios de cocina innovadores.',
                    '🎁 El catálogo navideño está lleno de sorpresas! Productos perfectos para regalar o mejorar tu hogar.',
                    '📚 ¡Te va a encantar! El nuevo catálogo tiene más de 50 productos nuevos con ofertas especiales.'
                ];
                const response = responses[Math.floor(Math.random() * responses.length)];
                return response + '\n\n¿Te gustaría que Carlos o Carina te lo envíen por WhatsApp?';
            }
            
            // Respuestas sobre precios con más detalle
            if (message.includes('precio') || message.includes('costo') || message.includes('cuanto') || message.includes('barato') || message.includes('caro')) {
                conversationContext.lastTopic = 'precios';
                if (message.includes('organizacion') || message.includes('organización')) {
                    return '💰 Los productos de organización van desde $59 hasta $299:\n• Cajas básicas: $59-$129\n• Organizadores premium: $159-$299\n\n¡Hay opciones para todos los presupuestos! ¿Cuál te interesa más?';
                } else if (message.includes('cocina')) {
                    return '💰 Productos de cocina desde $89 hasta $449:\n• Utensilios básicos: $89-$149\n• Sets profesionales: $199-$449\n\n¡La calidad es increíble! ¿Qué necesitas para tu cocina?';
                } else if (message.includes('limpieza')) {
                    return '💰 Productos de limpieza desde $59 hasta $599:\n• Básicos: $59-$149\n• Equipos avanzados: $199-$599\n\n¡Limpiar nunca fue tan fácil! ¿Qué área quieres mejorar?';
                }
                return '💰 Tenemos productos desde $59 hasta $599, ¡hay opciones para todos!\n\n🏠 Organización: $59-$299\n🍳 Cocina: $89-$449\n🧽 Limpieza: $59-$599\n\n¿Qué categoría te interesa más?';
            }
            
            // Respuestas sobre organización más específicas
            if (message.includes('organizacion') || message.includes('organización') || message.includes('cajas') || message.includes('closet') || message.includes('orden')) {
                conversationContext.lastTopic = 'organizacion';
                conversationContext.interests.push('organizacion');
                const tips = [
                    '📦 ¡Perfecto! La organización cambia vidas. Nuestros organizadores multiusos son ideales para closets pequeños.',
                    '🏠 ¡Excelente elección! Un hogar organizado es un hogar feliz. Tenemos soluciones para cada espacio.',
                    '✨ ¡Me encanta! Organizar es terapéutico. Nuestras cajas transparentes te permiten ver todo de un vistazo.'
                ];
                const tip = tips[Math.floor(Math.random() * tips.length)];
                return tip + '\n\n¿Es para tu recámara, cocina, baño o algún área específica?';
            }
            
            // Respuestas sobre cocina con consejos
            if (message.includes('cocina') || message.includes('utensilios') || message.includes('cocinar') || message.includes('chef')) {
                conversationContext.lastTopic = 'cocina';
                conversationContext.interests.push('cocina');
                const responses = [
                    '🍳 ¡Qué emocionante! Cocinar con las herramientas correctas es un placer. Nuestros cuchillos profesionales son increíbles.',
                    '👨‍🍳 ¡Perfecto! Buenos utensilios hacen la diferencia. El procesador de alimentos te ahorrará horas.',
                    '🥘 ¡Excelente! Nuestras sartenes antiadherentes cocinan sin aceite, ¡súper saludable!'
                ];
                const response = responses[Math.floor(Math.random() * responses.length)];
                return response + '\n\n¿Eres principiante en la cocina o ya tienes experiencia? Así te recomiendo mejor.';
            }
            
            // Respuestas sobre limpieza con motivación
            if (message.includes('limpieza') || message.includes('limpiar') || message.includes('aspiradora') || message.includes('sucio')) {
                conversationContext.lastTopic = 'limpieza';
                conversationContext.interests.push('limpieza');
                const responses = [
                    '🧽 ¡Genial! Un hogar limpio es un hogar saludable. Nuestra aspiradora sin cable es una maravilla.',
                    '✨ ¡Perfecto! Limpiar puede ser fácil con las herramientas correctas. La mopa 360° llega a todos lados.',
                    '🏠 ¡Excelente! Mantener la casa impecable no tiene que ser difícil. Nuestros productos lo hacen súper fácil.'
                ];
                const response = responses[Math.floor(Math.random() * responses.length)];
                return response + '\n\n¿Cuál es tu mayor reto de limpieza? ¿Pisos, ventanas, o limpieza general?';
            }
            
            // Respuestas sobre ser distribuidor más motivadoras
            if (message.includes('distribuidor') || message.includes('negocio') || message.includes('vender') || message.includes('ganar') || message.includes('dinero')) {
                conversationContext.lastTopic = 'distribuidor';
                const motivational = [
                    '🤝 ¡Qué emocionante! Ser distribuidor de BetterMancera cambió la vida de miles de personas.',
                    '💪 ¡Increíble decisión! Este negocio te da libertad financiera y horarios flexibles.',
                    '🌟 ¡Excelente! Muchos de nuestros distribuidores empezaron como tú y ahora tienen equipos grandes.'
                ];
                const response = motivational[Math.floor(Math.random() * motivational.length)];
                return response + '\n\n💰 Ganancias del 40% promedio\n⏰ Horarios flexibles\n📚 Capacitación completa\n🎯 Productos que se venden solos\n\n¿Te gustaría una llamada con Carlos para conocer más detalles?';
            }
            
            // Respuestas sobre contacto más útiles
            if (message.includes('contacto') || message.includes('telefono') || message.includes('whatsapp') || message.includes('llamar')) {
                const userName = conversationContext.userName ? `, ${conversationContext.userName}` : '';
                return `📱 ¡Perfecto${userName}! Aquí tienes toda la información de contacto:\n\n👨‍💼 Carlos Fernando: 477-223-3286\n👩‍💼 Carina Gómez: 477-223-3286\n\n⏰ Horarios:\n• Lun-Vie: 9:00 AM - 7:00 PM\n• Sábados: 9:00 AM - 2:00 PM\n\n¿Prefieres que te conecte directamente al WhatsApp?`;
            }
            
            // Respuestas sobre horarios
            if (message.includes('horario') || message.includes('cuando') || message.includes('abierto') || message.includes('disponible')) {
                return '⏰ Nuestros horarios de atención son:\n\n📅 Lunes a Viernes: 9:00 AM - 7:00 PM\n📅 Sábados: 9:00 AM - 2:00 PM\n📅 Domingos: Solo WhatsApp\n\n💬 ¡El WhatsApp está disponible 24/7 para consultas rápidas!';
            }
            
            // Saludos más personalizados
            if (message.includes('hola') || message.includes('buenos') || message.includes('buenas') || message.includes('hi')) {
                const greetings = [
                    '👋 ¡Hola! Bienvenido/a a BetterMancera. Soy tu asistente virtual y estoy aquí para ayudarte.',
                    '😊 ¡Qué gusto saludarte! Soy el bot de BetterMancera, listo para resolver todas tus dudas.',
                    '🌟 ¡Hola! Me da mucho gusto que estés aquí. ¿En qué puedo ayudarte hoy?'
                ];
                const greeting = greetings[Math.floor(Math.random() * greetings.length)];
                return greeting + '\n\n¿Te interesa conocer productos, precios, o tal vez ser distribuidor?';
            }
            
            // Agradecimientos más cálidos
            if (message.includes('gracias') || message.includes('thank') || message.includes('genial') || message.includes('perfecto')) {
                const userName = conversationContext.userName ? `, ${conversationContext.userName}` : '';
                const thanks = [
                    `😊 ¡De nada${userName}! Es un placer ayudarte. ¿Hay algo más en lo que pueda asistirte?`,
                    `🌟 ¡Me alegra poder ayudarte${userName}! Si tienes más preguntas, aquí estaré.`,
                    `💙 ¡Gracias a ti por confiar en BetterMancera${userName}! ¿Necesitas algo más?`
                ];
                return thanks[Math.floor(Math.random() * thanks.length)];
            }

            // Respuestas a consultas específicas
            if (message.includes('entrega') || message.includes('envio') || message.includes('envío')) {
                return '🚚 ¡Excelente pregunta! Las entregas las coordinan directamente Carlos y Carina según tu ubicación.\n\n📍 Entregas locales: Mismo día o siguiente\n📦 Envíos foráneos: 2-5 días hábiles\n💰 Envío gratis en compras mayores a $500\n\n¿En qué ciudad te encuentras?';
            }

            if (message.includes('garantia') || message.includes('garantía') || message.includes('devolucion')) {
                return '🛡️ ¡Claro! BetterMancera respalda todos sus productos:\n\n✅ Garantía de satisfacción 30 días\n🔄 Cambios por defectos de fábrica\n💯 Productos de calidad internacional\n📞 Soporte post-venta completo\n\n¡Tu satisfacción es nuestra prioridad!';
            }

            if (message.includes('oferta') || message.includes('descuento') || message.includes('promocion')) {
                return '🎉 ¡Siempre hay ofertas especiales! Este mes tenemos:\n\n💥 Descuentos por volumen\n🎁 Productos de regalo en compras grandes\n📦 Combos especiales navideños\n⭐ Precios preferenciales para distribuidores\n\n¿Te interesa alguna categoría en particular?';
            }

            // Respuesta inteligente basada en contexto
            if (conversationContext.lastTopic && conversationContext.messageCount > 3) {
                const contextResponses = {
                    'catalogo': '📖 ¿Ya decidiste si quieres que te envíen el catálogo? ¡Está lleno de productos increíbles!',
                    'precios': '💰 ¿Algún producto específico te llamó la atención por su precio?',
                    'organizacion': '📦 ¿Te ayudo a elegir el organizador perfecto para tu espacio?',
                    'cocina': '🍳 ¿Qué tipo de cocina tienes? Así te recomiendo los mejores productos.',
                    'limpieza': '🧽 ¿Cuál es tu mayor reto de limpieza en casa?',
                    'distribuidor': '🤝 ¿Te gustaría que Carlos te llame para platicar sobre la oportunidad de negocio?'
                };
                
                if (contextResponses[conversationContext.lastTopic] && Math.random() > 0.7) {
                    return contextResponses[conversationContext.lastTopic];
                }
            }
            
            // Respuesta por defecto más inteligente
            const defaultResponses = [
                '🤖 Entiendo tu consulta. Puedo ayudarte con información detallada sobre:',
                '💡 ¡Perfecto! Tengo información completa sobre:',
                '🌟 ¡Excelente pregunta! Te puedo ayudar con:'
            ];
            
            const defaultResponse = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
            
            return defaultResponse + '\n\n📖 Catálogo y productos nuevos\n💰 Precios y ofertas especiales\n🤝 Oportunidad de negocio\n📱 Contacto directo con distribuidores\n🚚 Entregas y garantías\n\n¿Qué te interesa más?';
        }

        function sendMessage() {
            const input = document.getElementById('chatInput');
            const message = input.value.trim();
            
            if (message) {
                // Agregar mensaje del usuario
                addMessage(message, true);
                input.value = '';
                
                // Simular tiempo de respuesta del bot
                setTimeout(() => {
                    const botResponse = getBotResponse(message);
                    addMessage(botResponse);
                    
                    // Agregar botones de acción después de ciertas respuestas
                    setTimeout(() => {
                        addActionButtons(message.toLowerCase());
                    }, 1500);
                }, 1000);
            }
        }

        function sendQuickMessage(type) {
            const messages = {
                'catalogo': 'Quiero ver el catálogo actualizado',
                'productos': '¿Qué productos tienen disponibles?',
                'precios': '¿Cuáles son los precios?',
                'distribuidor': 'Me interesa ser distribuidor'
            };
            
            const input = document.getElementById('chatInput');
            input.value = messages[type];
            sendMessage();
        }

        function handleEnter(event) {
            if (event.key === 'Enter') {
                sendMessage();
            }
        }

        // Función para agregar botones de acción interactivos
        function addActionButtons(userMessage) {
            const chatMessages = document.getElementById('chatMessages');
            
            let buttons = [];
            
            if (userMessage.includes('catalogo') || userMessage.includes('catálogo')) {
                buttons = [
                    { text: '📱 Enviar por WhatsApp', action: 'whatsapp-catalog' },
                    { text: '🏠 Ver productos', action: 'show-products' }
                ];
            } else if (userMessage.includes('precio') || userMessage.includes('costo')) {
                buttons = [
                    { text: '📖 Ver catálogo completo', action: 'show-catalog' },
                    { text: '💬 Consultar precios', action: 'whatsapp-prices' }
                ];
            } else if (userMessage.includes('distribuidor') || userMessage.includes('negocio')) {
                buttons = [
                    { text: '📞 Llamada informativa', action: 'whatsapp-distributor' },
                    { text: '📊 Ver beneficios', action: 'show-benefits' }
                ];
            } else if (userMessage.includes('organizacion') || userMessage.includes('cocina') || userMessage.includes('limpieza')) {
                const category = userMessage.includes('organizacion') ? 'organizacion' : 
                               userMessage.includes('cocina') ? 'cocina' : 'limpieza';
                buttons = [
                    { text: `🛍️ Ver productos de ${category}`, action: `show-${category}` },
                    { text: '💬 Consultar disponibilidad', action: 'whatsapp-products' }
                ];
            } else if (userMessage.includes('contacto') || userMessage.includes('whatsapp')) {
                buttons = [
                    { text: '📱 Abrir WhatsApp', action: 'open-whatsapp' },
                    { text: '📋 Copiar teléfono', action: 'copy-phone' }
                ];
            }
            
            if (buttons.length > 0) {
                const buttonContainer = document.createElement('div');
                buttonContainer.className = 'flex flex-wrap gap-2 justify-center my-3';
                
                buttons.forEach(button => {
                    const btn = document.createElement('button');
                    btn.className = 'bg-gradient-to-r from-betterware-blue to-betterware-mint text-white px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity shadow-sm';
                    btn.textContent = button.text;
                    btn.onclick = () => handleActionButton(button.action);
                    buttonContainer.appendChild(btn);
                });
                
                chatMessages.appendChild(buttonContainer);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
        }

        // Manejar acciones de los botones
        function handleActionButton(action) {
            switch(action) {
                case 'whatsapp-catalog':
                    window.open('https://wa.me/524772233286?text=Hola! Me interesa recibir el catálogo actualizado de BetterMancera', '_blank');
                    addMessage('¡Perfecto! Te he conectado con WhatsApp para que recibas el catálogo. 📱');
                    break;
                    
                case 'show-products':
                    addMessage('¡Excelente! Puedes ver nuestros productos en las secciones de Organización, Cocina y Limpieza en la página principal. 🛍️');
                    break;
                    
                case 'show-catalog':
                    addMessage('El catálogo completo lo puedes descargar desde la sección principal o solicitarlo por WhatsApp. ¡Tiene más de 50 productos nuevos! 📖');
                    break;
                    
                case 'whatsapp-prices':
                    window.open('https://wa.me/524772233286?text=Hola! Me gustaría conocer los precios actuales de los productos BetterMancera', '_blank');
                    addMessage('¡Listo! Carlos o Carina te darán todos los precios y ofertas especiales. 💰');
                    break;
                    
                case 'whatsapp-distributor':
                    window.open('https://wa.me/524772233286?text=Hola! Me interesa conocer más sobre la oportunidad de ser distribuidor BetterMancera', '_blank');
                    addMessage('¡Genial! Te van a explicar todo sobre esta increíble oportunidad de negocio. 🤝');
                    break;
                    
                case 'show-benefits':
                    addMessage('🌟 Beneficios de ser distribuidor:\n\n💰 40% de ganancia promedio\n⏰ Horarios flexibles\n📚 Capacitación completa\n🎯 Productos que se venden solos\n👥 Apoyo constante del equipo\n📈 Crecimiento ilimitado');
                    break;
                    
                case 'show-organizacion':
                    showProducts('organizacion');
                    addMessage('¡Te he abierto el catálogo de productos de organización! 📦');
                    break;
                    
                case 'show-cocina':
                    showProducts('cocina');
                    addMessage('¡Mira estos increíbles productos de cocina! 🍳');
                    break;
                    
                case 'show-limpieza':
                    showProducts('limpieza');
                    addMessage('¡Aquí tienes los mejores productos de limpieza! 🧽');
                    break;
                    
                case 'whatsapp-products':
                    window.open('https://wa.me/524772233286?text=Hola! Me gustaría consultar sobre la disponibilidad de productos BetterMancera', '_blank');
                    addMessage('¡Perfecto! Te van a dar toda la información de disponibilidad y entregas. 📦');
                    break;
                    
                case 'open-whatsapp':
                    window.open('https://wa.me/524772233286', '_blank');
                    addMessage('¡Te he conectado con WhatsApp! Carlos y Carina te atenderán de inmediato. 📱');
                    break;
                    
                case 'copy-phone':
                    navigator.clipboard.writeText('477-223-3286').then(() => {
                        addMessage('📋 ¡Teléfono copiado! 477-223-3286 - Ya puedes pegarlo donde necesites.');
                    }).catch(() => {
                        addMessage('📞 El teléfono es: 477-223-3286 - Puedes copiarlo manualmente.');
                    });
                    break;
                    
                default:
                    addMessage('¡Gracias por tu interés! ¿En qué más puedo ayudarte? 😊');
            }
        }

        // Mostrar notificación del bot después de unos segundos
        setTimeout(() => {
            if (!chatOpen) {
                const chatToggle = document.getElementById('chatToggle');
                chatToggle.classList.add('animate-bounce');
                
                // Crear notificación
                const notification = document.createElement('div');
                notification.className = 'absolute -top-12 right-0 bg-white rounded-lg shadow-lg p-3 text-sm text-gray-800 whitespace-nowrap border border-gray-200';
                notification.innerHTML = '💬 ¡Hola! ¿Necesitas ayuda?';
                document.getElementById('chatBot').appendChild(notification);
                
                // Remover notificación después de 5 segundos
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                    chatToggle.classList.remove('animate-bounce');
                }, 5000);
            }
        }, 3000);
// Safeguard: ensure functions exist globally for inline onclicks in index.html
// These implementations are defensive: they won't throw if targets are missing.

// Helper: escape for CSS selectors (fallback if CSS.escape not available)
function _escapeSelector(id) {
  try {
    if (window.CSS && typeof window.CSS.escape === 'function') return window.CSS.escape(id);
  } catch (_) {
    // ignore
  }
  return String(id).replace(/[^a-zA-Z0-9_-]/g, '\\$&');
}

// Smoothly scrolls to a section by id. Example: scrollToSection('catalogo')
window.scrollToSection = function (id, options = {}) {
  try {
    if (!id || typeof id !== 'string') return;
    const el = document.getElementById(id) || document.querySelector(`#${_escapeSelector(id)}`);
    if (el && typeof el.scrollIntoView === 'function') {
      el.scrollIntoView({ behavior: 'smooth', block: options.block || 'start' });
    } else {
      // Fallback: try to navigate to hash without scrollIntoView
      if (id) location.hash = `#${id}`;
    }
  } catch (e) {
    console.warn('scrollToSection error:', e);
  }
};

// Toggles chat widget visibility. Targets #chatWindow + #chatIcon first, then falls back.
window.toggleChat = function () {
  try {
    // Primary behavior: toggle chat window panel
    const chatWindow = document.getElementById('chatWindow');
    const chatIcon = document.getElementById('chatIcon');
    if (chatWindow) {
      const isHidden = chatWindow.classList.contains('hidden') || chatWindow.style.display === 'none';
      if (isHidden) {
        chatWindow.classList.remove('hidden');
        chatWindow.style.display = '';
        if (chatIcon) chatIcon.className = 'fas fa-times text-2xl';
      } else {
        chatWindow.classList.add('hidden');
        chatWindow.style.display = 'none';
        if (chatIcon) chatIcon.className = 'fas fa-robot text-2xl';
      }
      return;
    }

    // Fallback: toggle a container if present
    const candidates = ['chatWindow', 'chatBot', 'chatbot', 'chat', 'chat-container', 'chatWidget'];
    const el = candidates.map(id => document.getElementById(id)).find(Boolean);
    if (!el) {
      console.warn('toggleChat: no chat element found. Tried ids:', candidates);
      return;
    }
    const isHidden = el.classList.contains('hidden') || el.style.display === 'none';
    if (isHidden) {
      el.classList.remove('hidden');
      el.style.display = '';
      el.setAttribute('aria-hidden', 'false');
    } else {
      el.classList.add('hidden');
      el.style.display = 'none';
      el.setAttribute('aria-hidden', 'true');
    }
  } catch (e) {
    console.warn('toggleChat error:', e);
  }
};

// Shows products by category id, or highlights/scrolls to the element if filtering isn't available.
window.showProducts = function (categoryId) {
  try {
    if (!categoryId) return;
    // First try: filter elements with data-category
    const items = document.querySelectorAll('[data-category]');
    if (items.length) {
      items.forEach(el => {
        const match = el.getAttribute('data-category') === String(categoryId);
        el.classList.toggle('hidden', !match);
      });
      // Scroll to the first visible item
      const first = Array.from(items).find(el => !el.classList.contains('hidden'));
      if (first) first.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    // Fallback: find element by id and scroll/highlight
    const target = document.getElementById(categoryId) || document.querySelector(`#${_escapeSelector(categoryId)}`);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      target.classList.add('ring-2', 'ring-blue-400');
      setTimeout(() => target.classList.remove('ring-2', 'ring-blue-400'), 1800);
    } else {
      console.warn('showProducts: no matching element for id/data-category =', categoryId);
    }
  } catch (e) {
    console.warn('showProducts error:', e);
  }
};

// Downloads or opens the current catalog PDF.
window.downloadCatalog = function () {
  try {
    const url = 'catalogos/catalogosept2508.pdf';
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener';
    a.setAttribute('download', '');
    document.body.appendChild(a);
    a.click();
    a.remove();
  } catch (e) {
    console.warn('downloadCatalog error:', e);
  }
};

// Optional: enable smooth scroll for in-page anchor links if present
document.addEventListener('DOMContentLoaded', () => {
  try {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', evt => {
        const id = a.getAttribute('href').slice(1);
        if (id) {
          evt.preventDefault();
          window.scrollToSection(id);
        }
      });
    });
  } catch (e) {
    // Non-fatal
  }
});

