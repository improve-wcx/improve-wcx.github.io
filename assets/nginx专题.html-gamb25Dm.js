import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,e as i,o as e}from"./app-ChJrCjrk.js";const l="/assets/img-20240328193514-W3g3nwnU.png",p={};function c(d,s){return e(),a("div",null,s[0]||(s[0]=[i(`<h1 id="nginx专题" tabindex="-1"><a class="header-anchor" href="#nginx专题"><span>nginx专题</span></a></h1><h2 id="nginx七大应用场景" tabindex="-1"><a class="header-anchor" href="#nginx七大应用场景"><span>nginx七大应用场景</span></a></h2><ul><li>web服务器<br> 请给出，nginx作为web服务器的常见配置conf文件，要求可以直接使用。</li></ul><div class="language-text line-numbers-mode" data-highlighter="shiki" data-ext="text" data-title="text" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>server {</span></span>
<span class="line"><span>    listen 80;</span></span>
<span class="line"><span>    server_name example.com;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 根目录</span></span>
<span class="line"><span>    root /var/www/example.com;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 索引文件</span></span>
<span class="line"><span>    index index.html index.php;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # SSL 证书</span></span>
<span class="line"><span>    ssl_certificate /path/to/certificate.crt;</span></span>
<span class="line"><span>    ssl_certificate_key /path/to/certificate.key;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # HTTP 标头安全（HSTS）</span></span>
<span class="line"><span>    add_header Strict-Transport-Security &quot;max-age=31536000&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 缓存</span></span>
<span class="line"><span>    location /static {</span></span>
<span class="line"><span>        expires 30d;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # Gzip 压缩</span></span>
<span class="line"><span>    gzip on;</span></span>
<span class="line"><span>    gzip_types text/plain text/css text/javascript application/javascript application/x-javascript;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # keepalive 连接</span></span>
<span class="line"><span>    keepalive_timeout 65;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # FastCGI 配置</span></span>
<span class="line"><span>    location ~ \\.php$ {</span></span>
<span class="line"><span>        fastcgi_pass 127.0.0.1:9000;</span></span>
<span class="line"><span>        fastcgi_index index.php;</span></span>
<span class="line"><span>        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;</span></span>
<span class="line"><span>        include fastcgi_params;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 错误页面</span></span>
<span class="line"><span>    error_page 404 /404.html;</span></span>
<span class="line"><span>    error_page 500 /500.html;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 日志记录</span></span>
<span class="line"><span>    access_log /var/log/nginx/example.com-access.log;</span></span>
<span class="line"><span>    error_log /var/log/nginx/example.com-error.log;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>反向代理</li><li>负载均衡<br> 请给出，nginx作为web服务器的常见配置conf文件，要求可以直接使用。</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>server {</span></span>
<span class="line"><span>    listen 80;</span></span>
<span class="line"><span>    server_name example.com;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 将请求转发到后端服务器</span></span>
<span class="line"><span>    location / {</span></span>
<span class="line"><span>        proxy_pass http://backend-server:8080;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # SSL 证书</span></span>
<span class="line"><span>    ssl_certificate /path/to/certificate.crt;</span></span>
<span class="line"><span>    ssl_certificate_key /path/to/certificate.key;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # HTTP 标头安全（HSTS）</span></span>
<span class="line"><span>    add_header Strict-Transport-Security &quot;max-age=31536000&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # keepalive 连接</span></span>
<span class="line"><span>    keepalive_timeout 65;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 负载均衡</span></span>
<span class="line"><span>    upstream backend-servers {</span></span>
<span class="line"><span>        # 负载均衡策略</span></span>
<span class="line"><span>        ip_hash;</span></span>
<span class="line"><span>        server backend-server1:8080;</span></span>
<span class="line"><span>        server backend-server2:8080;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 将请求负载均衡到后端服务器</span></span>
<span class="line"><span>    location /api {</span></span>
<span class="line"><span>        proxy_pass http://backend-servers;</span></span>
<span class="line"><span>        proxy_set_header Host $host </span></span>
<span class="line"><span>        proxy_set_header X-Real-IP $remote_addr</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 日志记录</span></span>
<span class="line"><span>    access_log /var/log/nginx/example.com-access.log;</span></span>
<span class="line"><span>    error_log /var/log/nginx/example.com-error.log;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="url重定向" tabindex="-1"><a class="header-anchor" href="#url重定向"><span>URL重定向</span></a></h2><h2 id="防盗链" tabindex="-1"><a class="header-anchor" href="#防盗链"><span>防盗链</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>server {</span></span>
<span class="line"><span>    listen 80;</span></span>
<span class="line"><span>    server_name example.com;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 允许来自自身网站的请求</span></span>
<span class="line"><span>    location / {</span></span>
<span class="line"><span>        allow all;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 阻止来自其他网站的请求</span></span>
<span class="line"><span>    location / {</span></span>
<span class="line"><span>        valid_referers none blocked server_names example.com *.example.com;</span></span>
<span class="line"><span>        if (invalid_referer) {</span></span>
<span class="line"><span>            return 403;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="根据变量重定向" tabindex="-1"><a class="header-anchor" href="#根据变量重定向"><span>根据变量重定向</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>server {</span></span>
<span class="line"><span>    listen 80;</span></span>
<span class="line"><span>    server_name example.com;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # 将包含 &quot;ipad&quot; 的 user-agent 的请求重定向到 test.com</span></span>
<span class="line"><span>    location / {</span></span>
<span class="line"><span>        if ($http_user_agent ~* &quot;ipad&quot;) {</span></span>
<span class="line"><span>            return 301 https://test.com$request_uri;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # 对于其他请求，正常处理</span></span>
<span class="line"><span>        ...</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="也可以根据请求路径转发到响应的服务" tabindex="-1"><a class="header-anchor" href="#也可以根据请求路径转发到响应的服务"><span>也可以根据请求路径转发到响应的服务</span></a></h2><h2 id="nginx匹配路径" tabindex="-1"><a class="header-anchor" href="#nginx匹配路径"><span>nginx匹配路径<code>/</code></span></a></h2><figure><img src="`+l+`" alt="Img" tabindex="0" loading="lazy"><figcaption>Img</figcaption></figure><h2 id="nginx配置图形化界面" tabindex="-1"><a class="header-anchor" href="#nginx配置图形化界面"><span>nginx配置图形化界面</span></a></h2><p>nginx proxy manager 官网地址： <a href="https://nginxproxymanager.com/guide/" target="_blank" rel="noopener noreferrer">https://nginxproxymanager.com/guide/</a></p><p>Create a docker-compose.yml file similar to this:</p><div class="language-yml line-numbers-mode" data-highlighter="shiki" data-ext="yml" data-title="yml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">version</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;3.8&#39;</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">services</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  app</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    image</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;jc21/nginx-proxy-manager:latest&#39;</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    restart</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">unless-stopped</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    ports</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;80:80&#39;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;81:81&#39;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;443:443&#39;</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    volumes</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">./data:/data</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">./letsencrypt:/etc/letsencrypt</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,18)]))}const v=n(p,[["render",c],["__file","nginx专题.html.vue"]]),m=JSON.parse('{"path":"/posts/banana/devops/nginx%E4%B8%93%E9%A2%98.html","title":"nginx专题","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2022-01-05T00:00:00.000Z","category":["devops"],"tag":["黄"],"description":"nginx专题 nginx七大应用场景 web服务器 请给出，nginx作为web服务器的常见配置conf文件，要求可以直接使用。 反向代理 负载均衡 请给出，nginx作为web服务器的常见配置conf文件，要求可以直接使用。 URL重定向 防盗链 根据变量重定向 也可以根据请求路径转发到响应的服务 nginx匹配路径/ ImgImg nginx配置...","head":[["meta",{"property":"og:url","content":"https://improve-wcx.github.io/posts/banana/devops/nginx%E4%B8%93%E9%A2%98.html"}],["meta",{"property":"og:site_name","content":"登峰造极"}],["meta",{"property":"og:title","content":"nginx专题"}],["meta",{"property":"og:description","content":"nginx专题 nginx七大应用场景 web服务器 请给出，nginx作为web服务器的常见配置conf文件，要求可以直接使用。 反向代理 负载均衡 请给出，nginx作为web服务器的常见配置conf文件，要求可以直接使用。 URL重定向 防盗链 根据变量重定向 也可以根据请求路径转发到响应的服务 nginx匹配路径/ ImgImg nginx配置..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-02-19T11:29:03.000Z"}],["meta",{"property":"article:tag","content":"黄"}],["meta",{"property":"article:published_time","content":"2022-01-05T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-02-19T11:29:03.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"nginx专题\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-01-05T00:00:00.000Z\\",\\"dateModified\\":\\"2025-02-19T11:29:03.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"王晨曦\\",\\"url\\":\\"https://improve-wcx.github.io\\"}]}"]]},"headers":[{"level":2,"title":"nginx七大应用场景","slug":"nginx七大应用场景","link":"#nginx七大应用场景","children":[]},{"level":2,"title":"URL重定向","slug":"url重定向","link":"#url重定向","children":[]},{"level":2,"title":"防盗链","slug":"防盗链","link":"#防盗链","children":[]},{"level":2,"title":"根据变量重定向","slug":"根据变量重定向","link":"#根据变量重定向","children":[]},{"level":2,"title":"也可以根据请求路径转发到响应的服务","slug":"也可以根据请求路径转发到响应的服务","link":"#也可以根据请求路径转发到响应的服务","children":[]},{"level":2,"title":"nginx匹配路径/","slug":"nginx匹配路径","link":"#nginx匹配路径","children":[]},{"level":2,"title":"nginx配置图形化界面","slug":"nginx配置图形化界面","link":"#nginx配置图形化界面","children":[]}],"git":{"createdTime":1739963485000,"updatedTime":1739964543000,"contributors":[{"name":"晨曦001","username":"晨曦001","email":"chinawangchenxi@163.com","commits":2,"url":"https://github.com/晨曦001"}]},"readingTime":{"minutes":1.56,"words":467},"filePathRelative":"posts/banana/devops/nginx专题.md","localizedDate":"2022年1月5日","excerpt":"\\n<h2>nginx七大应用场景</h2>\\n<ul>\\n<li>web服务器<br>\\n请给出，nginx作为web服务器的常见配置conf文件，要求可以直接使用。</li>\\n</ul>\\n<div class=\\"language-text line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"text\\" data-title=\\"text\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span>server {</span></span>\\n<span class=\\"line\\"><span>    listen 80;</span></span>\\n<span class=\\"line\\"><span>    server_name example.com;</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span>    # 根目录</span></span>\\n<span class=\\"line\\"><span>    root /var/www/example.com;</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span>    # 索引文件</span></span>\\n<span class=\\"line\\"><span>    index index.html index.php;</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span>    # SSL 证书</span></span>\\n<span class=\\"line\\"><span>    ssl_certificate /path/to/certificate.crt;</span></span>\\n<span class=\\"line\\"><span>    ssl_certificate_key /path/to/certificate.key;</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span>    # HTTP 标头安全（HSTS）</span></span>\\n<span class=\\"line\\"><span>    add_header Strict-Transport-Security \\"max-age=31536000\\";</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span>    # 缓存</span></span>\\n<span class=\\"line\\"><span>    location /static {</span></span>\\n<span class=\\"line\\"><span>        expires 30d;</span></span>\\n<span class=\\"line\\"><span>    }</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span>    # Gzip 压缩</span></span>\\n<span class=\\"line\\"><span>    gzip on;</span></span>\\n<span class=\\"line\\"><span>    gzip_types text/plain text/css text/javascript application/javascript application/x-javascript;</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span>    # keepalive 连接</span></span>\\n<span class=\\"line\\"><span>    keepalive_timeout 65;</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span>    # FastCGI 配置</span></span>\\n<span class=\\"line\\"><span>    location ~ \\\\.php$ {</span></span>\\n<span class=\\"line\\"><span>        fastcgi_pass 127.0.0.1:9000;</span></span>\\n<span class=\\"line\\"><span>        fastcgi_index index.php;</span></span>\\n<span class=\\"line\\"><span>        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;</span></span>\\n<span class=\\"line\\"><span>        include fastcgi_params;</span></span>\\n<span class=\\"line\\"><span>    }</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span>    # 错误页面</span></span>\\n<span class=\\"line\\"><span>    error_page 404 /404.html;</span></span>\\n<span class=\\"line\\"><span>    error_page 500 /500.html;</span></span>\\n<span class=\\"line\\"><span></span></span>\\n<span class=\\"line\\"><span>    # 日志记录</span></span>\\n<span class=\\"line\\"><span>    access_log /var/log/nginx/example.com-access.log;</span></span>\\n<span class=\\"line\\"><span>    error_log /var/log/nginx/example.com-error.log;</span></span>\\n<span class=\\"line\\"><span>}</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{v as comp,m as data};
