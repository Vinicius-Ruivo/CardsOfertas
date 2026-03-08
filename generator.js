/**
 * Gem Card Educacionais - Gerador de Código React/JSX
 * Especialista em Design de Marketing Educacional
 */

const UNISUL_CIDADES = [
  'ARARANGUÁ', 'BRAÇO DO NORTE', 'CONTINENTE', 'CRICIÚMA',
  'FLORIANÓPOLIS', 'ITAJAÍ', 'PEDRA BRANCA', 'TUBARÃO'
];

const UNISOCIESC_CIDADES = [
  'ANITA GARIBALDI', 'BLUMENAU', 'JARAGUÁ DO SUL', 'SÃO BENTO DO SUL'
];

const FADERGS_CIDADES = ['CENTRO'];
const UNIRITTER_CIDADES = ['CANOAS', 'FAPA', 'ZONA SUL'];
const UNICURITIBA_CIDADES = ['MILTON VIANNA FILHO'];

/** Logo UniRitter (SVG oficial, texto branco para fundo escuro) - usado no código React gerado */
const LOGO_UNIRITTER_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="139" height="28" viewBox="0 0 169 34" fill="none"><g clip-path="url(#clip0_uniritter)"><path d="M81.2269 28.1652V12.8855H86.2433V28.466H81.2269V28.1652ZM81.2269 7.53389H86.2433V11.1582H81.2269V7.53389ZM98.47 7.55702C99.5754 7.54646 100.678 7.66159 101.757 7.90017C102.627 8.08372 103.455 8.42625 104.2 8.91034C104.891 9.37146 105.443 10.0113 105.797 10.761C106.119 11.4908 106.292 12.2773 106.305 13.0744C106.337 13.7713 106.204 14.466 105.917 15.1024C105.624 15.7344 105.181 16.2861 104.626 16.7102C104.19 17.0553 103.715 17.349 103.211 17.5855C102.731 17.8022 102.23 17.9676 101.715 18.079L106.983 28.4891H101.478L96.051 17.4158C96.7878 17.4616 97.5273 17.4279 98.2568 17.3156C99.0129 17.1858 99.7206 16.8585 100.308 16.3671C100.714 15.9999 101.018 15.5334 101.188 15.0138C101.412 14.3393 101.515 13.6304 101.49 12.9202C101.508 12.2798 101.387 11.6431 101.133 11.0541C100.884 10.5324 100.478 10.101 99.9703 9.82027C99.195 9.3653 97.9234 9.37687 96.4232 9.39229H95.7603V28.466H90.8603V7.55702H98.47ZM109.545 12.8855H114.542V28.466H109.545V12.8855ZM109.545 7.53389H114.542V11.1582H109.545V7.53389ZM136.213 14.8595V24.6181C136.213 25.9945 136.67 26.3146 137.376 26.3146C137.755 26.3007 138.133 26.2608 138.507 26.195L138.759 26.1565L139.035 26.1179V28.5084L138.829 28.5392H138.787L138.647 28.5624C137.33 28.8197 135.987 28.9194 134.646 28.8593C134.159 28.886 133.671 28.8004 133.222 28.6092C132.773 28.4179 132.374 28.1261 132.057 27.7566C131.425 26.9854 131.157 25.8866 131.157 24.6489V14.8595H125.153V24.6181C125.153 25.6514 125.401 26.0909 125.812 26.2374C126.223 26.384 126.947 26.2721 127.715 26.1565L127.994 26.1179V28.5084L127.789 28.5392H127.742C127.405 28.5932 127.638 28.5392 127.541 28.5739C126.271 28.8237 124.976 28.9195 123.683 28.8593C122.23 28.8593 121.334 28.3966 120.799 27.6332C120.264 26.8698 120.109 25.8403 120.109 24.6489V14.8595H117.008V12.8739H120.078V7.44521H125.118V12.8778H131.212V7.44521H136.213C136.213 9.22265 136.213 11.0926 136.213 12.8701H140.737V14.8595H136.213ZM146.885 17.7782V18.8694H150.556V17.7782C150.601 16.993 150.489 16.2067 150.226 15.4649C150.09 15.1827 149.876 14.9445 149.61 14.7778C149.344 14.6111 149.035 14.5227 148.72 14.5227C148.406 14.5227 148.097 14.6111 147.831 14.7778C147.564 14.9445 147.351 15.1827 147.214 15.4649C146.952 16.2067 146.84 16.993 146.885 17.7782ZM154.859 27.8414C153.12 28.5743 151.246 28.933 149.358 28.894C147.478 28.894 145.532 28.732 143.931 27.6447C143.469 27.3352 143.082 26.9269 142.799 26.4495C142.501 25.9577 142.27 25.4287 142.113 24.8764C141.929 24.2314 141.8 23.5724 141.725 22.9062C141.43 20.5928 141.481 18.0134 142.307 15.8389C143.256 13.3404 145.516 12.523 147.951 12.4112C148.222 12.4112 148.513 12.4112 148.823 12.4112C149.133 12.4112 149.42 12.4112 149.699 12.4344C151.68 12.5616 153.878 13.2055 154.898 15.1063C155.855 16.8722 155.65 19.3282 155.65 21.2444H146.885C146.885 22.4512 146.831 23.8161 147.385 24.9073C148.013 26.1449 149.478 26.4495 150.703 26.3878C152.217 26.3286 153.672 25.7925 154.859 24.8571V27.8414ZM158.495 28.1652V13.9728C159.104 13.5789 159.764 13.2689 160.457 13.0513C161.251 12.8039 162.063 12.622 162.887 12.5076C163.817 12.3767 164.755 12.3071 165.694 12.2994C166.803 12.2903 167.912 12.3547 169.012 12.4922V15.2875C168.066 14.6783 166.299 14.6398 165.186 14.7053C164.589 14.723 164.002 14.8663 163.465 15.1256V28.466H158.48V28.1652H158.495ZM77.1061 28.1652C77.1061 23.7891 77.1061 19.6366 77.1061 15.2605C75.5206 12.3495 71.6556 12.176 68.8219 12.2262C67.0341 12.2624 65.2574 12.5136 63.5303 12.9742C62.7498 13.1604 62.003 13.4661 61.3168 13.8802H61.2896L61.1811 13.9535V28.466H66.1858V15.1256C67.0898 14.7024 68.0833 14.5026 69.0816 14.5434C70.7214 14.5665 72.1557 15.3145 72.0898 17.6086V28.466H77.0945V28.1652H77.1061ZM57.1301 7.4375V22.2662V23.0797V23.1105V23.1491C56.5679 24.7376 55.1646 26.0794 53.4744 27.0625C51.6214 28.1498 49.5263 28.7631 47.3765 28.8477C45.2269 28.7625 43.1319 28.1492 41.2787 27.0625C39.5885 26.0794 38.1774 24.7492 37.623 23.1491V23.1105V23.0681V22.2546V7.4375H43.2131V22.3086C43.2114 22.8855 43.3111 23.4584 43.5077 24.0012C43.6788 24.4722 43.9566 24.8977 44.3196 25.2447C44.6826 25.5917 45.1211 25.8509 45.6011 26.0023C46.1688 26.1821 46.7614 26.2719 47.3572 26.2683C47.9542 26.2719 48.5481 26.1821 49.1171 26.0023C49.5936 25.843 50.0281 25.5795 50.3887 25.2311C50.7541 24.8827 51.0339 24.4552 51.2066 23.9819C51.4051 23.4396 51.5049 22.8664 51.5012 22.2893V7.4375H57.1301Z" fill="#ffffff"/><path d="M0 0H9.42399C12.4128 0 14.9559 0.589908 16.5686 1.75816C18.4022 3.08063 19.0418 4.92361 19.1193 7.05962C19.1658 7.93126 19.0059 8.80157 18.6524 9.60049C18.2989 10.3994 17.7617 11.1046 17.0841 11.6594C15.9393 12.6182 14.5608 13.2604 13.0874 13.5216L19.7939 27.4018H13.4673L6.81892 13.1939C7.9819 13.2286 10.2536 13.2402 11.9477 11.6979C13.0331 10.707 13.6107 9.18791 13.5913 6.85913C13.5913 4.78867 13.0098 3.35438 11.4941 2.41747C10.2613 1.66948 8.2804 1.79671 5.95832 1.80828H5.64432V20.3846C5.6034 22.6807 6.3423 24.9235 7.74155 26.7502C9.90469 29.5224 13.444 30.9914 16.9485 30.9143C18.6975 30.8816 20.4179 30.467 21.988 29.6997C23.0492 29.1861 24.0173 28.5008 24.8528 27.6717L25.1009 27.3941H22.116L15.3009 13.6643C18.8557 13.0859 21.4298 10.2636 21.2864 6.63165C21.1158 2.50615 18.7007 0.747988 14.6147 0H17.2082C19.7822 0 22.1857 0.41255 23.8798 1.78515C25.2986 2.94183 26.0352 3.90188 26.2678 6.41188C26.4539 8.42836 25.9111 10.2675 24.566 11.5745C23.7018 12.4595 22.5995 13.078 21.391 13.3558L27.0547 24.2209L27.1129 24.0667C27.5322 22.9043 27.7422 21.6774 27.7331 20.4424V0.00771121H33.3774V23.1067C31.9974 26.0446 29.5435 29.2756 26.4461 30.9181C23.444 32.4882 20.0775 33.2398 16.6887 33.0965C12.856 33.154 9.08778 32.1126 5.83427 30.0969C3.36488 28.5276 1.38394 25.6629 0.0193829 23.1992L0 0Z" fill="#ED1C24"/></g><defs><clipPath id="clip0_uniritter"><rect width="169" height="33.112" fill="white"/></clipPath></defs></svg>';



/** Logo Pravaler (texto branco + retângulo laranja atrás de "valer") */
const LOGO_PRAVALER_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="180" height="36" viewBox="0 0 180 36"><defs><linearGradient id="pravaler-orange" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#E85D04"/><stop offset="100%" stop-color="#F47920"/></linearGradient></defs><path transform="rotate(-8 95 18)" fill="url(#pravaler-orange)" d="M55 8h85v20H55z"/><text x="0" y="24" font-family="Arial,sans-serif" font-size="26" font-weight="700" fill="#ffffff">pravaler</text></svg>';

/** Logo UniCuritiba (texto branco + chevron nas cores da marca) */
const LOGO_UNICURITIBA_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="195" height="44" viewBox="0 0 195 44"><defs><linearGradient id="unicuritiba-chevron" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#004F6B"/><stop offset="100%" stop-color="#00C2B8"/></linearGradient></defs><text x="0" y="30" font-family="Arial,sans-serif" font-size="30" font-weight="700" fill="#ffffff">unicuritiba</text><text x="158" y="30" font-family="Arial,sans-serif" font-size="36" font-weight="700" fill="url(#unicuritiba-chevron)">›</text></svg>';

/** Logo Fadergs (SVG oficial) */
const LOGO_FADERGS_SVG = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"180\" height=\"37\" viewBox=\"0 0 180 37\"><g><path style=\"fill:#ffffff\" d=\"M43.439,3.001V13.15h4.369c1.001,0,1.736-0.239,2.202-0.717c0.466-0.479,0.776-1.418,0.931-2.828h0.655v8.742h-0.655c-0.012-1.005-0.134-1.74-0.365-2.209c-0.229-0.47-0.545-0.822-0.953-1.058c-0.405-0.236-1.012-0.353-1.812-0.353h-4.369v8.111c0,1.309,0.076,2.172,0.23,2.592c0.115,0.315,0.363,0.59,0.738,0.818c0.521,0.303,1.063,0.457,1.631,0.457h0.867v0.704H36.613v-0.704h0.849c0.991,0,1.709-0.312,2.16-0.936c0.282-0.405,0.423-1.386,0.423-2.933V6.16c0-1.307-0.076-2.172-0.23-2.59c-0.117-0.315-0.358-0.59-0.724-0.816c-0.507-0.307-1.05-0.459-1.629-0.459h-0.849V1.592h18.129l0.229,5.674h-0.618c-0.308-1.205-0.662-2.092-1.07-2.656c-0.406-0.564-0.908-0.976-1.502-1.228c-0.597-0.255-1.519-0.381-2.77-0.381h-5.57H43.439z\"/><path style=\"fill:#ffffff\" d=\"M65.252,18.77h-9.288l-1.628,4.073c-0.4,1.005-0.6,1.753-0.6,2.249c0,0.393,0.172,0.738,0.521,1.036c0.347,0.298,1.101,0.494,2.257,0.583v0.703h-7.553v-0.703c1.001-0.191,1.648-0.439,1.943-0.745c0.602-0.608,1.267-1.847,1.998-3.713L61.342,1h0.619l8.35,21.479c0.67,1.729,1.285,2.849,1.83,3.361c0.551,0.514,1.312,0.803,2.292,0.869v0.702h-9.464v-0.702c0.955-0.051,1.602-0.225,1.936-0.516c0.336-0.293,0.504-0.649,0.504-1.069c0-0.558-0.234-1.438-0.707-2.647l-1.448-3.709L65.252,18.77z M64.756,17.359L60.689,6.921l-4.174,10.438H64.756z\"/><path style=\"fill:#ffffff\" d=\"M74.008,27.414V26.71h0.902c1.013,0,1.734-0.351,2.158-1.048c0.258-0.42,0.392-1.359,0.392-2.819V6.16c0-1.611-0.165-2.62-0.498-3.026c-0.459-0.561-1.144-0.838-2.052-0.838h-0.902V1.593h9.764c3.585,0,6.313,0.437,8.183,1.313c1.869,0.876,3.371,2.337,4.511,4.38c1.137,2.047,1.706,4.405,1.706,7.086c0,3.589-1.017,6.595-3.042,9.007c-2.276,2.691-5.742,4.038-10.401,4.038h-10.72V27.414z M80.854,25.547c1.497,0.355,2.753,0.533,3.767,0.533c2.736,0,5.008-1.036,6.811-3.104c1.808-2.072,2.707-4.875,2.707-8.416c0-3.539-0.899-6.381-2.707-8.438c-1.803-2.057-4.121-3.084-6.95-3.084c-1.062,0-2.27,0.186-3.625,0.555v21.953H80.854z\"/><path style=\"fill:#ffffff\" d=\"M105.033,3.001v10.138h5.271c1.369,0,2.281-0.225,2.742-0.668c0.613-0.584,0.957-1.543,1.023-3.015h0.656v8.987h-0.656c-0.163-1.256-0.329-1.926-0.494-2.281c-0.21-0.443-0.561-0.794-1.043-1.049c-0.484-0.254-1.229-0.379-2.229-0.379h-5.271v8.375c0,1.144,0.049,1.84,0.143,2.086c0.095,0.248,0.261,0.445,0.496,0.59c0.234,0.146,0.684,0.22,1.345,0.22h4.065c1.356,0,2.343-0.101,2.957-0.304c0.611-0.204,1.198-0.604,1.767-1.199c0.733-0.787,1.479-1.975,2.245-3.562h0.708l-2.07,6.476H98.205v-0.704h0.851c0.565,0,1.104-0.148,1.609-0.438c0.378-0.205,0.634-0.508,0.771-0.916c0.139-0.406,0.206-1.236,0.206-2.494V6.087c0-1.64-0.153-2.647-0.463-3.026c-0.425-0.509-1.132-0.763-2.121-0.763h-0.851V1.595h18.482l0.27,5.657h-0.689c-0.248-1.359-0.523-2.292-0.821-2.801c-0.301-0.506-0.746-0.895-1.337-1.159c-0.472-0.192-1.301-0.286-2.494-0.286h-6.58L105.033,3.001z\"/><path style=\"fill:#ffffff\" d=\"M142.558,27.414h-6.401l-8.119-12.074c-0.603,0.027-1.092,0.04-1.471,0.04c-0.151,0-0.315-0.003-0.493-0.009c-0.177-0.006-0.357-0.016-0.548-0.03v7.503c0,1.625,0.165,2.637,0.496,3.028c0.447,0.56,1.12,0.84,2.018,0.84h0.938v0.704h-10.277v-0.704h0.901c1.018,0,1.741-0.356,2.175-1.065c0.247-0.396,0.371-1.326,0.371-2.801V6.16c0-1.624-0.166-2.635-0.496-3.026c-0.459-0.561-1.144-0.838-2.052-0.838h-0.901V1.593h8.738c2.546,0,4.424,0.198,5.634,0.599c1.208,0.4,2.235,1.137,3.074,2.209c0.847,1.074,1.269,2.352,1.269,3.838c0,1.587-0.481,2.965-1.443,4.131c-0.96,1.17-2.448,1.992-4.466,2.479l4.952,7.405c1.133,1.701,2.104,2.831,2.918,3.392c0.813,0.557,1.876,0.914,3.185,1.065V27.414z M125.522,14.139c0.225,0,0.421,0.004,0.583,0.01c0.165,0.008,0.303,0.008,0.407,0.008c2.288,0,4.013-0.532,5.174-1.598c1.162-1.064,1.745-2.425,1.745-4.076c0-1.649-0.47-2.924-1.407-3.935c-0.938-1.009-2.179-1.515-3.725-1.515c-0.683,0-1.609,0.121-2.775,0.363v10.742H125.522z\"/><path style=\"fill:#ffffff\" d=\"M159.401,1l0.62,8.15h-0.62c-0.625-2.032-1.432-3.562-2.421-4.59c-1.429-1.485-3.262-2.229-5.501-2.229c-3.054,0-5.379,1.302-6.971,3.9c-1.333,2.199-2,4.814-2,7.848c0,2.463,0.444,4.711,1.328,6.74c0.884,2.031,2.042,3.521,3.476,4.467c1.435,0.945,2.901,1.421,4.412,1.421c0.887,0,1.738-0.122,2.566-0.362c0.823-0.24,1.62-0.598,2.385-1.066v-7.465c0-1.295-0.089-2.325-0.271-2.726c-0.184-0.399-0.468-0.705-0.85-0.914c-0.384-0.207-1.06-0.313-2.024-0.313v-0.723h9.284v0.723h-0.442c-0.918,0-1.549,0.33-1.892,0.992c-0.235,0.471-0.354,1.582-0.354,2.965v7.904c-1.356,0.786-2.694,1.362-4.016,1.733c-1.32,0.368-2.79,0.551-4.405,0.551c-4.635,0-8.153-1.603-10.561-4.798c-1.803-2.402-2.707-5.169-2.707-8.305c0-2.271,0.508-4.449,1.523-6.531c1.201-2.475,2.853-4.382,4.951-5.712c1.758-1.104,3.833-1.657,6.227-1.657c0.871,0,1.663,0.076,2.376,0.227c0.716,0.151,1.726,0.489,3.034,1.008c0.662,0.269,1.104,0.402,1.325,0.402s0.418-0.111,0.577-0.334c0.157-0.223,0.256-0.658,0.29-1.305h0.653V1z\"/><path style=\"fill:#ffffff\" d=\"M177.646,1v8.932h-0.652c-0.214-1.714-0.596-3.08-1.144-4.095c-0.547-1.015-1.33-1.821-2.342-2.419c-1.017-0.598-2.065-0.893-3.146-0.893c-1.228,0-2.24,0.401-3.044,1.207c-0.802,0.807-1.203,1.724-1.203,2.752c0,0.789,0.253,1.505,0.76,2.152c0.733,0.951,2.473,2.219,5.22,3.809c2.24,1.295,3.771,2.289,4.592,2.979c0.818,0.694,1.447,1.509,1.892,2.447c0.439,0.942,0.662,1.923,0.662,2.952c0,1.957-0.705,3.642-2.111,5.057c-1.41,1.418-3.221,2.124-5.438,2.124c-0.696,0-1.353-0.056-1.963-0.171c-0.368-0.062-1.124-0.296-2.271-0.691c-1.151-0.402-1.879-0.603-2.188-0.603c-0.308,0-0.528,0.097-0.7,0.285c-0.171,0.188-0.299,0.585-0.38,1.18h-0.652v-8.856h0.652c0.31,1.854,0.72,3.24,1.237,4.162c0.522,0.92,1.312,1.686,2.38,2.297c1.066,0.606,2.238,0.914,3.51,0.914c1.477,0,2.641-0.42,3.492-1.256c0.857-0.838,1.286-1.828,1.286-2.972c0-0.632-0.162-1.274-0.487-1.924c-0.324-0.647-0.83-1.25-1.517-1.81c-0.457-0.381-1.714-1.191-3.767-2.431c-2.051-1.239-3.509-2.223-4.377-2.959c-0.866-0.735-1.526-1.548-1.972-2.437c-0.449-0.889-0.673-1.868-0.673-2.935c0-1.852,0.658-3.45,1.979-4.788c1.321-1.34,3-2.01,5.04-2.01c1.276,0,2.627,0.335,4.052,1.01c0.66,0.315,1.13,0.477,1.399,0.477c0.307,0,0.557-0.098,0.747-0.297c0.197-0.195,0.354-0.592,0.473-1.188h0.652L177.646,1z\"/><path style=\"fill:#B8262E\" d=\"M1.59,16.406c0.005,0.013,0.008,0.031,0.016,0.043L16.673,1.623H7.298L1.59,16.406z\"/><path style=\"fill:#B8262E\" d=\"M29.686,22.279l-24.814,2.5c0.037,0.062,0.074,0.123,0.111,0.183l19.539,5.028c1.854-1.999,3.711-4.537,5.166-7.713\"/><path style=\"fill:#B8262E\" d=\"M3.044,21.048l29.198-8.077c0.377-3.258,0.324-6.925-0.344-11.018L2.965,20.857C2.99,20.924,3.017,20.99,3.044,21.048\"/><path style=\"fill:#B8262E\" d=\"M2.128,18.443c0.013,0.041,0.024,0.078,0.037,0.117L31.771,1.621H17.308L2.128,18.443z\"/><path style=\"fill:#B8262E\" d=\"M3.923,23.012c0.011,0.022,0.022,0.047,0.035,0.066l25.844-1.059c1.114-2.5,1.976-5.375,2.396-8.67L3.923,23.012z\"/><path style=\"fill:#B8262E\" d=\"M6.052,26.648c4.618,6.697,10.567,9.351,10.567,9.351s3.813-1.696,7.697-5.792L6.052,26.648z\"/><path style=\"fill:#B8262E\" d=\"M7.088,1.621H1.373c-0.814,4.889-0.77,9.163-0.155,12.881L7.088,1.621z\"/></g></svg>";
function normalizarCidade(cidade) {
  if (!cidade) return '';
  return cidade.toUpperCase().trim();
}

function isUnisul(cidade) {
  const c = normalizarCidade(cidade);
  return UNISUL_CIDADES.includes(c);
}

function isUnisociesc(cidade) {
  const c = normalizarCidade(cidade);
  return UNISOCIESC_CIDADES.includes(c);
}

function isFadergs(cidade) {
  const c = normalizarCidade(cidade);
  return FADERGS_CIDADES.includes(c);
}

function isUniritter(cidade) {
  const c = normalizarCidade(cidade);
  return UNIRITTER_CIDADES.includes(c);
}

function isUnicuritiba(cidade) {
  const c = normalizarCidade(cidade);
  return UNICURITIBA_CIDADES.includes(c);
}

function gerarLogo(data) {
  if (data.condicao === 'pravaler') {
    return {
      tipo: 'pravaler',
      accent: '#E85D04',
      linha: '#C44D00'
    };
  }
  const cidade = normalizarCidade(data.cidade);
  if (isUnisul(cidade)) {
    return {
      tipo: 'unisul',
      accent: '#c6ff00',
      linha: '#c6ff00'
    };
  }
  if (isUnisociesc(cidade)) {
    return {
      tipo: 'unisociesc',
      accent: '#ed145b',
      linha: '#ed145b'
    };
  }
  if (isFadergs(cidade)) {
    return {
      tipo: 'fadergs',
      accent: '#C41E3A',
      linha: '#C41E3A'
    };
  }
  if (isUniritter(cidade)) {
    return {
      tipo: 'uniritter',
      accent: '#E31837',
      linha: '#E31837'
    };
  }
  if (isUnicuritiba(cidade)) {
    return {
      tipo: 'unicuritiba',
      accent: '#00C2B8',
      linha: '#004F6B'
    };
  }
  return {
    tipo: 'unisul',
    accent: '#c6ff00',
    linha: '#c6ff00'
  };
}

function gerarCodigoReact(data) {
  const triploFacilita = data.condicao === 'triplo';
  const duploFacilita = data.condicao === 'duplo';
  const mostraTarja = triploFacilita || duploFacilita;
  const mesTarja = duploFacilita ? 'Março' : 'Abril';
  const logo = gerarLogo(data);
  const logoInst = data.condicao === 'pravaler' ? gerarLogo({ ...data, condicao: 'sem' }) : null;
  const L = data.condicao === 'pravaler' ? logoInst : logo;
  const logoBoxStyle = "{ width: '185px', height: '56px', maxWidth: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-end', lineHeight: 0 }";

  let logoJSX;
  if (L.tipo === 'unisociesc') {
    logoJSX = `
        <span style=${logoBoxStyle}>
          <span className="flex items-center gap-2 text-white font-bold italic" style={{ fontSize: '2rem', lineHeight: 1 }}>
            <span>unisociesc</span>
            <span style={{ color: '${L.accent}' }}>›</span>
          </span>
        </span>`;
  } else if (L.tipo === 'fadergs') {
    logoJSX = `
        <span style=${logoBoxStyle}>
          <span className="inline-block leading-none" style={{ height: '56px', lineHeight: 0 }} dangerouslySetInnerHTML={{ __html: LOGO_FADERGS_SVG.replace(/<svg/, '<svg style=\\"height:100%;width:auto;max-width:100%;display:block\\"') }} />
        </span>`;
  } else if (L.tipo === 'uniritter') {
    logoJSX = `
        <span style=${logoBoxStyle}>
          <span className="block flex justify-end items-center" style={{ lineHeight: 0, height: '56px', width: '100%', minWidth: 0, transform: 'scale(1.15)', transformOrigin: 'right center' }} dangerouslySetInnerHTML={{ __html: LOGO_UNIRITTER_SVG.replace(/\\s+width="[^"]+"\\s+height="[^"]+"/, ' ').replace(/<svg/, '<svg style=\\"height:100%;width:auto;max-width:100%;display:block\\"') }} />
        </span>`;
  } else if (L.tipo === 'unicuritiba') {
    logoJSX = `
        <span style=${logoBoxStyle}>
          <span className="inline-block leading-none" style={{ height: '56px', lineHeight: 0 }} dangerouslySetInnerHTML={{ __html: LOGO_UNICURITIBA_SVG.replace(/<svg/, '<svg style=\\"height:100%;width:auto;max-width:100%;display:block\\"') }} />
        </span>`;
  } else {
    logoJSX = `
        <span style=${logoBoxStyle}>
          <span className="flex items-center gap-2 text-white font-bold italic" style={{ fontSize: '2.35rem', lineHeight: 1 }}>
            <span style={{ color: '${L.accent}' }}>›</span>
            <span>unisul</span>
          </span>
        </span>`;
  }

  let logoConst = '';
  if (logo.tipo === 'pravaler') {
    logoConst = `const LOGO_PRAVALER_SVG = ${JSON.stringify(LOGO_PRAVALER_SVG)};\n\n`;
    if (logoInst.tipo === 'uniritter') logoConst += `const LOGO_UNIRITTER_SVG = ${JSON.stringify(LOGO_UNIRITTER_SVG)};\n\n`;
    else if (logoInst.tipo === 'fadergs') logoConst += `const LOGO_FADERGS_SVG = ${JSON.stringify(LOGO_FADERGS_SVG)};\n\n`;
    else if (logoInst.tipo === 'unicuritiba') logoConst += `const LOGO_UNICURITIBA_SVG = ${JSON.stringify(LOGO_UNICURITIBA_SVG)};\n\n`;
  } else if (logo.tipo === 'uniritter') {
    logoConst = `const LOGO_UNIRITTER_SVG = ${JSON.stringify(LOGO_UNIRITTER_SVG)};\n\n`;
  } else if (logo.tipo === 'fadergs') {
    logoConst = `const LOGO_FADERGS_SVG = ${JSON.stringify(LOGO_FADERGS_SVG)};\n\n`;
  } else if (logo.tipo === 'unicuritiba') {
    logoConst = `const LOGO_UNICURITIBA_SVG = ${JSON.stringify(LOGO_UNICURITIBA_SVG)};\n\n`;
  }

  const tarjaOuLinha = mostraTarja
    ? `
      <div className="-mx-8 py-3 px-8" style={{ backgroundColor: '${logo.accent}' }}>
        <p className="${logo.tipo === 'unisul' ? 'text-black' : 'text-white'} font-bold italic text-center text-sm tracking-tight">
          Comece a pagar as mensalidades somente em ${mesTarja}!
        </p>
      </div>
      <div className="px-0 pt-4 pb-0">
        <p className="text-[11px] text-white/70 italic leading-tight">
          Sobre Facilita: Parcelamento facilitado. Pague menos agora e dilua a diferença ao longo do curso sem juros.
        </p>
      </div>`
    : `
      <div className="h-[2px] my-6" style={{ backgroundColor: '${logo.linha}' }} />
      <div>
        <p className="text-[11px] text-white/70 italic leading-tight">
          Os termos da bolsa estão no seu contrato educacional. Garanta a sua formação com condições exclusivas.
        </p>
      </div>`;

  return `import React from 'react';
import { MapPin, GraduationCap, School, Calendar, Moon, Clock } from 'lucide-react';
${logoConst}
const data = {
  curso: "${data.curso || 'Administração'}",
  cidade: "${data.cidade || 'Florianópolis'}",
  grau: "${data.grau || 'Bacharelado'}",
  modalidade: "${data.modalidade || 'Presencial'}",
  turno: "${data.turno || 'Noturno'}",
  qtdMeses: "${String(data.qtdMeses || '').replace(/"/g, '\\"')}",
  matricula: "${data.matricula || '49,90'}",
  matriculaBruto: "${data.matriculaBruto || '299,90'}",
  bolsa1Sem: "${data.bolsa1Sem || '60%'}",
  bolsaDemais: "${data.bolsaDemais || '40%'}",
  mensalidade1Sem: "${data.mensalidade1Sem || '299,90'}",
  mensalidadeDemais: "${data.mensalidadeDemais || '499,90'}",
  apenasUmaMensalidade: ${data.apenasUmaMensalidade ? 'true' : 'false'},
};

export default function OfferCard() {
  return (
    <div
      className="max-w-[550px] w-full rounded-[45px] p-8 shadow-2xl relative overflow-hidden"
      style={{ backgroundColor: '#0d1b2a', borderTop: '3px solid ${logo.accent}' }}
    >
      <div className="absolute flex justify-end items-start overflow-hidden" style={{ top: '12px', right: '16px', width: '48%', height: '64px' }}>
        ${logoJSX}
      </div>
      <div className="flex items-center gap-2 mb-6" style={{ paddingRight: '52%' }}>
        <GraduationCap size={24} style={{ color: '${logo.accent}' }} />
        <span className="text-white font-black uppercase italic tracking-tighter text-sm" style={{ color: '${logo.accent}' }}>
          BOLSA EXCLUSIVA!
        </span>
      </div>

      <h2
        className="font-black uppercase italic tracking-tighter leading-tight mb-2"
        style={{ color: '${logo.accent}', fontSize: '36px' }}
      >
        {data.curso}
      </h2>

      <p className="text-white font-bold mb-5" style={{ fontSize: '18px' }}>
        Bolsa de <span style={{ color: '${logo.accent}' }}>{data.bolsa1Sem}</span> no 1º Semestre
      </p>

      <div className="flex flex-wrap gap-4 mb-6 text-white/90 text-sm">
        <span className="flex items-center gap-1">
          <School size={14} style={{ color: '${logo.accent}' }} />
          {data.grau}
        </span>
        <span className="flex items-center gap-1">
          <Calendar size={14} style={{ color: '${logo.accent}' }} />
          {data.modalidade}
        </span>
        <span className="flex items-center gap-1">
          <Moon size={14} style={{ color: '${logo.accent}' }} />
          {data.turno}
        </span>
        {data.qtdMeses ? (
          <span className="flex items-center gap-1">
            <Clock size={14} style={{ color: '${logo.accent}' }} />
            {data.qtdMeses} meses
          </span>
        ) : null}
      </div>

      <div className="flex items-center gap-2 mb-6 text-white">
        <MapPin size={18} style={{ color: '${logo.accent}' }} />
        <span className="font-bold uppercase text-sm">UNIDADE {data.cidade}</span>
      </div>

      <div className="${data.condicao === 'pravaler' ? 'flex items-start gap-6 mb-6' : 'space-y-4 mb-6'}">
        <div className="space-y-4 ${data.condicao === 'pravaler' ? 'flex-1 min-w-0' : ''}">
          <div>
            <p className="text-white/70 text-xs uppercase mb-1">Matrícula</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black" style={{ color: '${logo.accent}' }}>R$ {data.matricula}</span>
              <span className="text-sm line-through text-white/50">R$ {data.matriculaBruto}</span>
            </div>
          </div>

          <div>
            <p className="text-white/70 text-xs uppercase mb-1">Bolsa</p>
            <p className="text-white">
              <span className="font-bold">{data.bolsa1Sem}</span> no 1º Sem • <span className="opacity-70">{data.bolsaDemais}</span> nos demais
            </p>
          </div>

          <div>
            <p className="text-white/70 text-xs uppercase mb-1">Mensalidade</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white">R$ {data.mensalidade1Sem}</span>
              {!data.apenasUmaMensalidade && <span className="text-sm text-white/60">1º Sem</span>}
            </div>
            {!data.apenasUmaMensalidade && <p className="text-sm text-white/60 mt-1">R$ {data.mensalidadeDemais} nos demais semestres</p>}
          </div>
        </div>
        ${data.condicao === 'pravaler' ? `<div className="flex-shrink-0 flex items-center min-h-[120px]">
          <span className="inline-block h-9 leading-none" dangerouslySetInnerHTML={{ __html: LOGO_PRAVALER_SVG }} />
        </div>` : ''}
      </div>
${tarjaOuLinha}
    </div>
  );
}`;
}

// Exportar para uso global no popup
if (typeof window !== 'undefined') {
  window.GemCardGenerator = { gerarCodigoReact };
}
