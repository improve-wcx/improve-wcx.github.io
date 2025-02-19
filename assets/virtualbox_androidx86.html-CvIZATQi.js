import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,e as t,o as n}from"./app-LCtBIzYo.js";const o="/assets/72bc7315-2Ye76vK7.png",r="/assets/120cca4a-DjMXsw7Y.png",s="/assets/ce86374f-DBAT5L_-.png",g="/assets/76704fc3-C-YMNeP0.png",p="/assets/35dc1cf4-BeVn0i1k.png",d="/assets/ecbc7d74.bin-balqdI3d.png",l="/assets/d31c1f00-VM8-sBun.png",c="/assets/5942fed1-Bz6LcCOO.png",m="/assets/b4897f2c-Dx164qqh.png",f="/assets/ccd77403-CTTDkPaa.png",h="/assets/e6f100d2-C2w07kN8.png",u="/assets/10f2670f-9G2Id5_K.png",b="/assets/0f54f29f-Dm6ChuDE.png",x="/assets/ad26a702-BKiHbNuM.png",_="/assets/550485fc-FoqZW0Jb.png",w="/assets/894b3c79-CFkgAZSA.png",v="/assets/4c241605-D7tiVEnT.png",k="/assets/87da8c69-CH-uHNf1.png",y="/assets/73e0d5af-CRcuGCMG.png",z="/assets/64bba0fe-CuUbHrW8.png",A="/assets/efc5894e-zEL78pVt.png",B="/assets/c4019e95-Czm0_czT.png",D="/assets/9a0d7975-gQ3W-jLC.png",T="/assets/d8f91347-DBnkzDyN.png",C="/assets/a8ed7215-CcbYlMG7.png",V="/assets/310385f0-BT5dpNlT.png",N="/assets/2fd52d52-Zoe3lg8a.png",F="/assets/58465ae6-bTgr3Jz1.png",q="/assets/99cabeb8-Byevibxf.png",S={};function Z(P,i){return n(),e("div",null,i[0]||(i[0]=[t('<h1 id="virtualbox中安装android-x86详解" tabindex="-1"><a class="header-anchor" href="#virtualbox中安装android-x86详解"><span><a href="https://www.cnblogs.com/wynn0123/p/6288344.html" target="_blank" rel="noopener noreferrer"> VirtualBox中安装Android-x86详解 </a></span></a></h1><h1 id="_1-下载安装virtualbox" tabindex="-1"><a class="header-anchor" href="#_1-下载安装virtualbox"><span>1.下载安装VirtualBox</span></a></h1><p>官网：<a href="http://www.virtualbox.org/wiki/Downloads" target="_blank" rel="noopener noreferrer">http://www.virtualbox.org/wiki/Downloads</a></p><h1 id="_2-下载android-x86" tabindex="-1"><a class="header-anchor" href="#_2-下载android-x86"><span>2.下载Android-x86</span></a></h1><p>官网：<a href="http://www.android-x86.org/download" target="_blank" rel="noopener noreferrer">http://www.android-x86.org/download</a></p><figure><img src="'+o+'" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>这里我们下载5.1稳定版</p><h1 id="_3-新建virtualbox虚拟机-并进行相关配置" tabindex="-1"><a class="header-anchor" href="#_3-新建virtualbox虚拟机-并进行相关配置"><span>3.新建VirtualBox虚拟机，并进行相关配置</span></a></h1><figure><img src="'+r+'" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><figure><img src="'+s+'" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><figure><img src="'+g+'" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><figure><img src="'+p+'" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><figure><img src="'+d+'" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>创建好之后如下：</p><figure><img src="'+l+'" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>右键-&gt;设置-&gt;系统， 修改指点设备为PS/2鼠标</p><figure><img src="'+c+'" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>显示：显存设置为最大，并启用3D加速</p><figure><img src="'+m+'" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>网络：修改为桥接网卡（默认的NAT方式主机无法访问虚拟机）</p><figure><img src="'+f+'" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h1 id="_4-安装android-x86" tabindex="-1"><a class="header-anchor" href="#_4-安装android-x86"><span>4.安装Android-x86</span></a></h1><p>双击打开上面创建的虚拟机，加载android-x86-5.1-rc1.iso镜像，如下</p><figure><img src="'+h+'" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>前3个都是光盘启动Android-x86系统，无需安装。我们选择最后一项，回车开始安装，如下</p><figure><img src="'+u+'" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>接着选择第二项，创建新分区，如下</p><figure><img src="'+b+'" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>选择NO，回车</p><figure><img src="'+x+'" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>选择NEW-&gt;Primary，默认大小，回车，如下</p><figure><img src="'+_+'" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>选择Bootable作为启动分区，回车，如下</p><figure><img src="'+w+'" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>选择Write回车，然后填写yes并回车，把上面的操作全部写入磁盘，如下</p><figure><img src="'+v+'" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>然后Quit，回到安装界面，选择第一项sda1，回车</p><figure><img src="'+k+'" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>分区格式我们这里选择<strong>ext3</strong>，官方推荐ntfs，但实际测试选择ntfs系统无法启动。</p><figure><img src="'+y+'" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>Yes</p><figure><img src="'+z+'" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>GRUB，即启动系统时的引导界面，Yes</p><figure><img src="'+A+'" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>EFI GRUB2，选择Skip</p><figure><img src="'+B+'" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>Yes</p><figure><img src="'+D+'" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>正在写入：</p><figure><img src="'+T+'" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>安装成功，Reboot，重启</p><figure><img src="'+C+'" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>这时还是会加载ISO进入系统安装界面，因为我们还没移除虚拟盘，点击移除虚拟盘，然后控制-&gt;重启</p><figure><img src="'+V+'" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>顺利进入GRUB，选择第一项启动Android-x86</p><figure><img src="'+N+'" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>选择简体中文，然后依次点击屏幕的ABCD四个位置，这样可以跳过设置向导，如下</p><figure><img src="'+F+'" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>然后进入桌面，如下</p><figure><img src="'+q+`" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>下面我们就可以在PC上随意调试安卓程序了~</p><p>在安装Android-x86后，由于nVidia显卡驱动的原因启动过程中可能会卡住无法进入图形界面。此时在需要在启动参数中添加nomodeset选项来禁用显卡。其他Linux系统中遇到同样的问题也可以使用此方法解决。</p><h1 id="常见问题" tabindex="-1"><a class="header-anchor" href="#常见问题"><span>常见问题</span></a></h1><h2 id="产生原因" tabindex="-1"><a class="header-anchor" href="#产生原因"><span>产生原因</span></a></h2><blockquote><p>The newest kernels have moved the video mode setting into the kernel. So all the programming of the hardware specific clock rates and registers on the video card happen in the kernel rather than in the X driver when the X server starts.. This makes it possible to have high resolution nice looking splash (boot) screens and flicker free transitions from boot splash to login screen. Unfortunately, on some cards this doesnt work properly and you end up with a black screen. Adding the nomodeset parameter instructs the kernel to not load video drivers and use BIOS modes instead until X is loaded.</p></blockquote><p>某些显卡下Linux内核无法正常工作导致黑屏。</p><h2 id="解决方法" tabindex="-1"><a class="header-anchor" href="#解决方法"><span>解决方法</span></a></h2><p>开机后在grub界面选择第二项<code>Debug mode</code>，输入</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>mount –o remount,rw /mnt</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>再输入</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>vi /mnt/grub/menu.lst</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>在第七行的root前加入<code>quiet nomodeset</code>，修改后内容如下：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>...</span></span>
<span class="line"><span>title Android-x86 8.1-r5</span></span>
<span class="line"><span>    kernel /android-8. 1-r5/kernel quiet nomodeset root=/dev/ram0 SRC=/android-8. 1-r5</span></span>
<span class="line"><span>    initrd /android-8. 1-r5/ initrd. img</span></span>
<span class="line"><span>...</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>按<code>ESC</code>退出编辑，并输入<code>:wq</code>保存退出。<br> 重启后即可进入图形界面。</p>`,74)]))}const M=a(S,[["render",Z],["__file","virtualbox_androidx86.html.vue"]]),R=JSON.parse('{"path":"/posts/banana/other/virtualbox_androidx86.html","title":"VirtualBox中安装Android-x86详解","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2022-01-05T00:00:00.000Z","category":["Android","虚拟机"],"tag":["黄"],"description":"VirtualBox中安装Android-x86详解 1.下载安装VirtualBox 官网：http://www.virtualbox.org/wiki/Downloads 2.下载Android-x86 官网：http://www.android-x86.org/download imgimg 这里我们下载5.1稳定版 3.新建VirtualBox...","head":[["meta",{"property":"og:url","content":"https://improve-wcx.github.io/posts/banana/other/virtualbox_androidx86.html"}],["meta",{"property":"og:site_name","content":"登峰造极"}],["meta",{"property":"og:title","content":"VirtualBox中安装Android-x86详解"}],["meta",{"property":"og:description","content":"VirtualBox中安装Android-x86详解 1.下载安装VirtualBox 官网：http://www.virtualbox.org/wiki/Downloads 2.下载Android-x86 官网：http://www.android-x86.org/download imgimg 这里我们下载5.1稳定版 3.新建VirtualBox..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-02-19T11:54:34.000Z"}],["meta",{"property":"article:tag","content":"黄"}],["meta",{"property":"article:published_time","content":"2022-01-05T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-02-19T11:54:34.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"VirtualBox中安装Android-x86详解\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-01-05T00:00:00.000Z\\",\\"dateModified\\":\\"2025-02-19T11:54:34.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"王晨曦\\",\\"url\\":\\"https://improve-wcx.github.io\\"}]}"]]},"headers":[{"level":2,"title":"产生原因","slug":"产生原因","link":"#产生原因","children":[]},{"level":2,"title":"解决方法","slug":"解决方法","link":"#解决方法","children":[]}],"git":{"createdTime":1739963485000,"updatedTime":1739966074000,"contributors":[{"name":"晨曦001","username":"晨曦001","email":"chinawangchenxi@163.com","commits":3,"url":"https://github.com/晨曦001"}]},"readingTime":{"minutes":2.73,"words":819},"filePathRelative":"posts/banana/other/virtualbox_androidx86.md","localizedDate":"2022年1月5日","excerpt":"\\n<h1>1.下载安装VirtualBox</h1>\\n<p>官网：<a href=\\"http://www.virtualbox.org/wiki/Downloads\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">http://www.virtualbox.org/wiki/Downloads</a></p>\\n<h1>2.下载Android-x86</h1>\\n<p>官网：<a href=\\"http://www.android-x86.org/download\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">http://www.android-x86.org/download</a></p>","autoDesc":true}');export{M as comp,R as data};
